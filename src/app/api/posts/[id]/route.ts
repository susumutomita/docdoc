import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(params.id, 10) },
      include: {
        tags: true,
        author: true,
      },
    });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'An error occurred while retrieving the post.',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { title, body, draft, notice, tags, scope, published_at } =
      await request.json();

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

    const post = await prisma.post.update({
      where: { id: parseInt(params.id, 10) },
      data: {
        title,
        body,
        draft,
        notice,
        scope,
        publishedAt: published_at ? new Date(published_at) : undefined,
      },
      include: {
        tags: true,
        author: true,
      },
    });

    // ポストとタグの関連付けをリセットして再設定
    await prisma.postTag.deleteMany({
      where: { postId: parseInt(params.id, 10) },
    });

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

    return NextResponse.json(postWithTags, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'An error occurred while updating the post.',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.postTag.deleteMany({
      where: { postId: parseInt(params.id, 10) },
    });
    await prisma.post.delete({
      where: { id: parseInt(params.id, 10) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'An error occurred while deleting the post.',
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
