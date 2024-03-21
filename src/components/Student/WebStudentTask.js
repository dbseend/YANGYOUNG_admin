import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  RowDiv,
  ListTable,
  ListTh,
  ListTr,
  ListTd,
  Button,
} from "../../styles/CommonStyles";
import {
  addPersonalTask,
  viewPersonalTask,
  deleteTaskAPI,
} from "../../api/TaskApi";
import AddPersonalTaskModal from "./AddPersonalTaskModal";

const WebStudentTask = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const { id } = useParams();
  const today = new Date().toLocaleDateString("en-CA");
  const [date, setDate] = useState(today);
  const [taskList, setTaskList] = useState([]);
  const [updateTaskList, setUpdateTaskList] = useState([]);
  const [selectedTaskList, setSelectedTaskList] = useState([]);

  const taskColumns = [
    { key: "content", label: "과제명" },
    { key: "taskDate", label: "날짜" },
    { key: "type", label: "종류" },
    { key: "status", label: "진행 상태" },
    { key: "check", label: "선택" },
  ];

  const taskProgress = [
    { key: "미시작", label: "미시작" },
    { key: "진행중", label: "진행중" },
    { key: "완료", label: "완료" },
  ];

  useEffect(() => {
    getTaskList();
  }, [date]);

  // 학생, 분발 할 일 조회
  const getTaskList = async () => {
    const data = await viewPersonalTask(id, date);
    console.log(data);
    setTaskList(data.studentTaskResponseList);
    setUpdateTaskList(data.studentTaskResponseList);
    // setSectionTaskList(data.sectionTaskList);
  };
  // 할 일 삭제
  const deleteTask = async () => {
    const taskIdList = selectedTaskList.map((taskId) => taskId);
    await deleteTaskAPI(taskIdList);
    window.location.reload();
  };

  const handleAllCheckboxChange = () => {
    console.log(selectedTaskList.length);
    if (selectedTaskList.length === taskList.length) {
      setSelectedTaskList([]);
    }
    if (selectedTaskList.length !== taskList.length) {
      setSelectedTaskList(taskList.map((task) => task.id));
    }
  };

  const handleCheckboxChange = (taskId) => {
    setSelectedTaskList((prevSelected) => {
      if (prevSelected.includes(taskId)) {
        return prevSelected.filter((id) => id !== taskId);
      } else {
        return [...prevSelected, taskId];
      }
    });
  };

  const handleTaskProgressChange = (index, value) => {
    setTaskList((prevStudentInfo) => {
      const updatedStudentInfo = [...prevStudentInfo];
      updatedStudentInfo[index].taskProgress = value;
      return updatedStudentInfo;
    });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  return (
    <div>
      <input
        type="date"
        id="dateInput"
        value={date}
        onChange={handleDateChange}
      />

      {/* 학생 할 일 테이블 */}
      <h1>학생 할 일</h1>

      <RowDiv>
        <Button onClick={openAddModal}>등록</Button>
        {isAddModalOpen && (
          <AddPersonalTaskModal
            onClose={closeAddModal}
            onAdd={addPersonalTask}
          />
        )}
        <Button onClick={deleteTask}>삭제</Button>
      </RowDiv>
      <ListTable>
        <thead>
          <tr>
            {taskColumns.map((column) => (
              <ListTh key={column.key}>
                {column.key === "check" ? (
                  <input
                    type="checkbox"
                    checked={selectedTaskList.length === taskList.length}
                    onClick={handleAllCheckboxChange}
                  />
                ) : (
                  column.label
                )}
              </ListTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {taskList.map((task, index) => (
            <ListTr key={task.id}>
              {taskColumns.map((column) => (
                <ListTd key={column.key}>
                  {column.key === "content" && task.content}
                  {column.key === "taskDate" && task.taskDate}
                  {column.key === "type" && task.taskType}
                  {column.key === "status" && (
                    <RowDiv>
                      {taskProgress.map((progress) => (
                        <ProgressDiv key={progress.key}>
                          <label>{progress.label}</label>
                          <input
                            type="radio"
                            value={progress.key}
                            checked={task.taskProgress === progress.key}
                            onChange={() =>
                              handleTaskProgressChange(index, progress.key)
                            }
                          />
                        </ProgressDiv>
                      ))}
                    </RowDiv>
                  )}
                  {column.key === "check" && (
                    <input
                      type="checkbox"
                      value={task.id}
                      checked={selectedTaskList.includes(task.id)}
                      onChange={() => handleCheckboxChange(task.id)}
                    />
                  )}
                </ListTd>
              ))}
            </ListTr>
          ))}
        </tbody>
      </ListTable>
    </div>
  );
};

const ProgressDiv = styled.div`
  padding-left: 5%;
  padding-right: 5%;
`;

export default WebStudentTask;
