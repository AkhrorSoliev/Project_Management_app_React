import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleToggleTaskStatus(taskId) {
    setProjectsState((prevState) => {
      const updatedProjects = prevState.projects.map((project) => {
        if (project.id === prevState.selectedProjectId) {
          return {
            ...project,
            tasks: project.tasks.map((task) => {
              if (task.id === taskId) {
                return { ...task, completed: !task.completed };
              }
              return task;
            }),
          };
        }
        return project;
      });

      return {
        ...prevState,
        projects: updatedProjects,
      };
    });
  }

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        id: taskId,
        completed: false,
      };

      const updatedProjects = prevState.projects.map((project) => {
        if (project.id === prevState.selectedProjectId) {
          return {
            ...project,
            tasks: [newTask, ...project.tasks],
          };
        }
        return project;
      });

      return {
        ...prevState,
        projects: updatedProjects,
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectsState((prevState) => {
      const updatedProjects = prevState.projects.map((project) => {
        if (project.id === prevState.selectedProjectId) {
          return {
            ...project,
            tasks: project.tasks.filter((task) => task.id !== taskId),
          };
        }
        return project;
      });

      return {
        ...prevState,
        projects: updatedProjects,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
        tasks: [],
        completed: false, // Initialize tasks array for the new project
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleToggleProjectStatus(projectId) {
    setProjectsState((prevState) => {
      const updatedProjects = prevState.projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, completed: !project.completed };
        }
        return project;
      });

      return {
        ...prevState,
        projects: updatedProjects,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      onToggleTaskStatus={handleToggleTaskStatus}
      tasks={selectedProject ? selectedProject.tasks : []} // Pass tasks of the selected project
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
        onToggleProjectStatus={handleToggleProjectStatus}
      />
      {content}
    </main>
  );
}

export default App;
