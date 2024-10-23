const { test, expect, describe } = require('@playwright/test')

describe('Book app', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await expect(page.getByText('Welcome to the book app')).toBeVisible()
  })
})