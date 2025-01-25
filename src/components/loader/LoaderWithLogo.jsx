// STYLED COMPONENT
import { RootStyle } from './styles';
export default function LoaderWithLogo() {
  return <RootStyle className="loading-wrapper">
      <div className="logo">
        <img src="/static/logo/icm-vida-nueva-notext.png" alt="asambles de Dios" />
      </div>

      <div className="loading-content"></div>
    </RootStyle>;
}