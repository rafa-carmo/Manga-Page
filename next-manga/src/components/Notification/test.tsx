import { render, screen } from '@testing-library/react'

import Notification from '.'

describe('<Notification />', () => {
  it('should render the heading', () => {
    const { container } = render(<Notification />)

    expect(screen.getByRole('heading', { name: /Notification/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
