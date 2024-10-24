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

  test('login fails with wrong credentials', async ({ page }) => {
    await page.getByText('log in').click()
    await expect(page.getByText('Log in to application')).toBeVisible()
    await page.getByRole('textbox').first().fill('testuser')
    await page.getByRole('textbox').last().fill('secret1')
    await page.getByRole('button', { name: 'log in' }).click()
    await expect(page.getByText('invalid username or password')).toBeVisible()
  })

  test('registration succeeds', async ({ page, request }) => {
    await page.getByText('log in').click()
    await page.getByText('Do not have an account yet? Please register.').click()
    await page.getByTestId('name').fill('timothy davids')
    await page.getByTestId('email').fill('timothy@gmail.com')
    await page.getByTestId('username').fill('timothy')
    await page.getByTestId('password').fill('mysecret12')
    await page.getByTestId('password2').fill('mysecret12')
    await page.getByText('register', { exact: true }).click()
    await expect(page.getByText('Registration ok')).toBeVisible()

  })

  describe('when testuser has logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByText('log in').click()
      await expect(page.getByText('Log in to application')).toBeVisible()
      await page.getByRole('textbox').first().fill('testuser')
      await page.getByRole('textbox').last().fill('secret10')
      await page.getByRole('button', { name: 'log in' }).click()
      await expect(page.getByText('testuser logged in')).toBeVisible()
    } )
  
   
    test('testuser can borrow and return a book', async ({ page }) => {
      await page.getByText('books', { exact: true }).click()
      await page.getByText('The Stranger by Albert Camus').click()
      await expect(page.getByText('The Stranger')).toBeVisible()
      await expect(page.getByText('author: Albert Camus')).toBeVisible()
      await page.getByRole('button', { name: 'borrow' }).click()
      await expect(page.getByText('You have borrowed the book.')).toBeVisible()

      page.on('dialog', dialog => dialog.accept());
      await page.getByText('my page').click()
      await expect(page.getByText('Name: testuser')).toBeVisible()
      await expect(page.getByText('Borrowed books:')).toBeVisible()
      await expect(page.getByText('The Stranger by Albert Camus')).toBeVisible()
      await page.getByRole('button', { name: 'Return' }).click(); 
      await expect(page.getByRole('button', { name: 'Return'} )).not.toBeVisible()
      await expect(page.getByText('The Stranger by Albert Camus')).not.toBeVisible()

    })

  })



})