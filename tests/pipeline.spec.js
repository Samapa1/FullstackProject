const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Book app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Testuser',
        email: 'testuser@gmal.com',
        username: 'testuser',
        password: 'secret10'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('Welcome to the book app')).toBeVisible()
  })

  test('login succeeds with right credentials', async ({ page }) => {
    await page.getByText('log in').click()
    await expect(page.getByText('Log in to application')).toBeVisible()
    await page.getByRole('textbox').first().fill('testuser')
    await page.getByRole('textbox').last().fill('secret10')
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByText('testuser logged in').waitFor()
  })
    // test('booklist can be opened', async ({ page }) => {
  //   await expect(page.getByText('Welcome to the book app')).toBeVisible()
  //   await page.getByText('books', { exact: true }).click()
  //   await page.getByText('The Stranger by Albert Camus').waitFor()
  // })

  // test('login fails with wrong credentials', async ({ page }) => {
  //   await page.getByText('log in').click()
  //   await expect(page.getByText('Log in to application')).toBeVisible()
  //   await page.getByRole('textbox').first().fill('testuser')
  //   await page.getByRole('textbox').last().fill('secret1')
  //   await page.getByRole('button', { name: 'log in' }).click()
  //   await expect(page.getByText('invalid username or password')).toBeVisible()
  // })

})