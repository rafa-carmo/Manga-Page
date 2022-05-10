import * as S from './styles'

export type LogoProps = {
  color?: 'white' | 'black'
  size?: 'small' | 'normal' | 'large'
  id?: string
}

const Logo = ({ color, size = 'small' }: LogoProps) => (
  <S.Wrapper color={color} size={size}>
    <svg viewBox="3.362 18.808 135 102" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M96.353 95.173V25.045c0-4.019-2.217-6.237-6.236-6.237H76.396c-4.02 0-6.237 2.218-6.237 6.237V58.35c0 .938 9.037 5.293 9.273 6.214 6.885 26.902 1.496 48.433-5.031 49.438 10.672.528 11.846 5.66 3.897 2.153 1.216-14.354 5.96-14.326 19.602-.528.117.12 2.797 5.741 2.964 5.741h32.217c4.019 0 6.236-2.217 6.236-6.236v-13.72c0-4.02-2.217-6.238-6.236-6.238H96.353Z"
        fill="#02a9ff"
      />
      <path
        d="M39.396 18.808 3.362 121.368h27.996l6.098-17.74h30.49l5.96 17.74h27.857L65.867 18.807H39.396Zm4.435 62.09 8.73-28.412 9.564 28.412H43.83Z"
        fill="currentColor"
      />
    </svg>
  </S.Wrapper>
)

export default Logo
