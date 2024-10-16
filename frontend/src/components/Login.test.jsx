import { screen } from '@testing-library/react'
import Login from './Login'
import { renderWithProviders } from '../../utils/test-utils'
import { renderWithRouter } from '../../utils/test-utils'

test('renders login page', () => {
  renderWithProviders(renderWithRouter(<Login/>, { route: '/login'}))

  expect (screen.getByText('Log in to application'))
})