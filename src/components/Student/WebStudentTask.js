import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  addPersonalTask,
  deleteTaskAPI,
  viewPersonalTask,
  updateTaskProgressAPI,
} from "../../api/TaskAPI";
import { formattedTaskProgress } from "../../util/Util";
import {
  Button,
  ListTable,
  ListTd,
  ListTh,
  ListTr,
  RowDiv,
  SubTitle,
  UpdateAndDeleteButton,
  DateInput,
} from "../../styles/CommonStyles";
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
    // setUpdateTaskList(data.studentTaskResponseList);
  };

  // 할 일 삭제
  const deleteTask = async () => {
    const taskIdList = selectedTaskList.map((taskId) => taskId);
    await deleteTaskAPI(taskIdList);
    window.location.reload();
  };

  // 할 일 상태 업데이트
  const updateTask = async () => {
    const updateData = updateTaskList.map((task) => {
      return {
        taskId: task.id,
        studentId: parseInt(id),
        taskProgress: formattedTaskProgress(task.taskProgress),
      };
    });

    try {
      await updateTaskProgressAPI(updateData);

      alert("과제 상태가 변경되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("과제 상태 변경 중 오류가 발생했습니다.");
    }
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
    const newTaskList = [...taskList];
    newTaskList[index].taskProgress = value;
    setUpdateTaskList(newTaskList);
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
      <SubTitle>할 일</SubTitle>

      <RowDiv style={{ marginBottom: 10 }}>
        <DateInput
          style={{ marginRight: 10 }}
          type="date"
          id="dateInput"
          value={date}
          onChange={handleDateChange}
        />
        <Button style={{ marginRight: 10 }} onClick={openAddModal}>
          등록
        </Button>
        {isAddModalOpen && (
          <AddPersonalTaskModal
            onClose={closeAddModal}
            onAdd={addPersonalTask}
          />
        )}
        <UpdateAndDeleteButton>
          <Button onClick={updateTask} style={{ marginRight: 10 }}>
            저장
          </Button>
          <Button onClick={deleteTask}>삭제</Button>
        </UpdateAndDeleteButton>
      </RowDiv>
      <ListTable>
        <thead>
          <ListTr>
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
          </ListTr>
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
