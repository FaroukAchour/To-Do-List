import React from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import Modal from '@src/modules/shared/components/Modal'
import { useCreateTaskMutation } from '../../services/tasksApi'

type FieldType = {
  name?: string
  status?: string
  color?: string
}

export interface ModalProps {
  open: boolean
  handleClose: (id: string) => void
  data?: any
  id: string
}

const CreateTaskModal: React.FC<ModalProps> = ({ open, handleClose, id }) => {
  const [createTask] = useCreateTaskMutation()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
    createTask(values)
      .unwrap()
      .then((res) => {
        console.log(res)
      })
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Modal open={open} handleClose={handleClose} id={id}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input to-do!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType> label="Status" name="status">
          <Input />
        </Form.Item>
        <Form.Item<FieldType> label="Color" name="color">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateTaskModal
