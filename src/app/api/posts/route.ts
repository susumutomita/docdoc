import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const {
      title,
      body,
      draft,
      notice,
      tags,
      scope,
      groups, // eslint-disable-line no-unused-vars
      author_id,
      published_at,
    } = await request.json();

    // タグの作成または取得
    const tagIds = [];
    if (tags) {
      for (const tagName of tags) {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
        tagIds.push(tag.id);
      }
    }

    // メモの作成
    const post = await prisma.post.create({
      data: {
        title,
        body,
        draft: draft || false,
        notice: notice || true,
        scope: scope || 'everyone',
        publishedAt: published_at ? new Date(published_at) : undefined,
        authorId: author_id,
      },
      include: {
        tags: true,
        author: true,
      },
    });

    // ポストとタグの関連付け
    if (tagIds.length > 0) {
      await prisma.postTag.createMany({
        data: tagIds.map(tagId => ({
          postId: post.id,
          tagId: tagId,
        })),
      });
    }

    const postWithTags = await prisma.post.findUnique({
      where: { id: post.id },
      include: {
        tags: true,
        author: true,
      },
    });

    return NextResponse.json(postWithTags, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      {
        message: 'An error occurred while creating the post.',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        tags: true,
        author: true,
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'An error occurred while retrieving the posts.',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
