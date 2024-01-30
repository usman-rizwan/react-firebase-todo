import { message, Space ,Button } from 'antd';
const Message = ()=>{
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'This is a success message',
        });
      };
      const error = () => {
        messageApi.open({
          type: 'error',
          content: 'This is an error message',
        });
      };
      return (
        <>
          {contextHolder}
          <Space>
            <Button onClick={success}>Success</Button>
            <Button onClick={error}>Error</Button>
          </Space>
        </>
      );
}
export default Message ;