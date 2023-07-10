/**
* @jest-environment jsdom　　　　
*/
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
describe('Rendering', () => {
  it('Should render hello text', () => {
    expect(1).toBe(1)
  })
})
