import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, InputNumber } from "antd";

const AddEditModal = ({
  visible,
  onCancel,
  onAdd,
  editedRow,
  onEditSubmit,
}) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editedRow) {
      setIsEditing(true);
      form.setFieldsValue({
        name: editedRow.name,
        date: editedRow.date ? editedRow.date : null,
        value: editedRow.value,
      });
    } else {
      setIsEditing(false);
      form.resetFields();
    }
  }, [visible, editedRow, form]);

  const handleSubmit = (values) => {
    if (isEditing) {
      onEditSubmit({ ...editedRow, ...values });
    } else {
      onAdd({ ...values, key: Date.now() });
    }
    form.resetFields();
  };

  return (
    <Modal
      title={isEditing ? "Редактировать запись" : "Добавить запись"}
      visible={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: "Пожалуйста, введите имя" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Дата"
          rules={[{ required: true, message: "Пожалуйста, введите дату" }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          name="value"
          label="Числовое значение"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите числовое значение",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditModal;
