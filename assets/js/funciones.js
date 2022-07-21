let tareas = [{id:1, descripcion:"hacer todo list", estado:"Realizada"},
              {id:2, descripcion:"hacer ejercicio", estado:"Cancelada"},
              {id:3, descripcion:"Salir a Patinar", estado:"Pendiente"},
              {id:4, descripcion:"cambiar enchufe malo", estado:"Realizada"}];

let cargaTareas = function(){
    // ordenar tareas por id de forma descendente 
    tareas = tareas.sort((tareaA, tareaB) => tareaB.id - tareaA.id);
    
    // construye string de table con arreglo de tareas
    idTblTarea.innerHTML = tareas.reduce((acu, tarea) => `${acu}
                                                      <tr>
                                                        <td>${tarea.id}</td>
                                                        <td>${tarea.descripcion}</td>
                                                        <td class="text-end">
                                                            <button name="btnCheck"
                                                                class="btn btn-sm text-white mx-1 my-1 ${tarea.estado === 'Realizada' ? 'btn-success' : 'btn-pastel'}"
                                                                data-bs-toggle="tooltip" title="Tarea Realizada">
                                                                <i class="fa-solid fa-check"></i>
                                                            </button>
                                                            <button name="btnCancel"
                                                                class="btn btn-sm text-white mx-1 my-1 ${tarea.estado === 'Cancelada' ? 'btn-danger' : 'btn-pastel'}"
                                                                data-bs-toggle="tooltip" title="Cancelar Tarea">
                                                                <i class="fa-solid fa-xmark"></i>
                                                            </button>
                                                            <button name="btnTrash"
                                                                class="btn btn-sm btn-pastel text-white mx-1 my-1"
                                                                data-bs-toggle="tooltip" title="Eliminar Tarea">
                                                                <i class="fa-regular fa-trash-can"></i>
                                                            </button>
                                                        </td>
                                                      </tr>`, '' );
    
    spanTotal.innerHTML = `Total: <h4><strong> ${tareas.length} </strong></h4>`;
    spanRealizadas.innerHTML = `Realizadas: <h4><strong> ${tareas.filter(tarea => tarea.estado === 'Realizada').length} </strong></h4>`;
};

// agregar tareas
let agregarTarea = function(descripcion){

    // validación de descripción vacía
    if(descripcion === ''){
        idMessage.innerHTML = 'Descripción no válida'
        modalInfo.show();
        
        return;
    }
    
    // agrega una nueva tarea al inicio del arreglo
    tareas.unshift({
        id: Math.max(...tareas.map(tarea => tarea.id)) + 1,
        descripcion: descripcion,
        estado: 'Pendiente'
    });

    // re-carga tareas
    cargaTareas();
}

// actualizar estado de tareas
let actualizarEstado = function(id, estado){
    let tareaActualizada = tareas[id];
    tareaActualizada.estado = estado;
    
    tareas.splice(id, 1, tareaActualizada);
}

// eliminar tarea del arreglo
let eliminarTarea = function(id){
    tareas.splice(id,1);
    cargaTareas();
}

