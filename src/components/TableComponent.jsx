// src/components/TableComponent.js
import React, { useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import AddEditModal from "./AddEditModal";

const getDateFromISO = (date) => date.toISOString().split("T")[0];

const TableComponent = ({ searchValue }) => {
  const [data, setData] = useState([]); // Данные таблицы
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedRow, setEditedRow] = useState(null); // Редактируемая строка

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date - b.date,
      render: getDateFromISO,
    },
    {
      title: "Числовое значение",
      dataIndex: "value",
      key: "value",
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: "Действия",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Редактировать
          </Button>
          <Popconfirm
            title="Вы уверены, что хотите удалить эту запись?"
            onConfirm={() => handleDelete(record.key)}
            okText="Да"
            cancelText="Нет"
          >
            <Button type="danger" style={{ marginLeft: 10 }}>
              Удалить
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const filterSearch = (row) => {
    const { name, date, value } = row;
    const string = `${name}${getDateFromISO(date)}${value}`;
    return searchValue ? string.includes(searchValue) : true;
  };

  const handleAdd = (newRow) => {
    setData([...data, newRow]);
    setIsModalVisible(false);
    message.success("Запись добавлена успешно!");
  };

  const handleEdit = (record) => {
    setEditedRow(record);
    setIsModalVisible(true);
  };

  const handleEditSubmit = (editedRow) => {
    setData((prevData) =>
      prevData.map((row) => (row.key === editedRow.key ? editedRow : row))
    );
    setEditedRow(null);
    setIsModalVisible(false);
    message.success("Запись обновлена успешно!");
  };

  const handleDelete = (key) => {
    setData(data.filter((record) => record.key !== key));
    message.success("Запись удалена успешно!");
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Добавить
      </Button>
      <AddEditModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onAdd={handleAdd}
        editedRow={editedRow}
        onEditSubmit={handleEditSubmit}
      />
      <Table dataSource={data.filter(filterSearch)} columns={columns} />
    </div>
  );
};

export default TableComponent;
