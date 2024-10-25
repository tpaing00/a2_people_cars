import { Typography } from "antd";

const FormTitle = ({ formTitle }) => {
  const { Title } = Typography;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'lightgray', marginRight: '1rem' }} />
      <Title style={{ fontSize: 20, margin: 0 }}>{formTitle}</Title>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'lightgray', marginLeft: '1rem' }} />
    </div>
  );
};

export default FormTitle;
