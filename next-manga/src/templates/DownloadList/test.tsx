import { render, screen } from '@testing-library/react'

import DownloadList from '.'

describe('<DownloadList />', () => {
  it('should render the heading', () => {
    const { container } = render(<DownloadList />)

    expect(screen.getByRole('heading', { name: /DownloadList/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
