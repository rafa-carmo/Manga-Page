import Base from 'templates/Base'

export default function Page404() {
  return (
    <Base>
      <div style={{ width: '100vw', height: '50vh' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/404.png"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: -1
          }}
        />
      </div>
    </Base>
  )
}
