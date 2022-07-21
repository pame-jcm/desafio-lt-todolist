        let spanTotal = document.getElementById("spanTotal");
        let spanRealizadas = document.getElementById("spanRealizadas")
        let idTblTarea = document.querySelector("#idTblTarea tbody");
        let inputTarea = document.getElementById('inputTarea');
        let btnAgregarTarea = document.getElementById('btnAgregarTarea');

        inputTarea.focus();
        cargaTareas();

        let modalInfo = new bootstrap.Modal(document.getElementById('modalInfo'));
        let idMessage = document.getElementById("idMessage");
        let myButton = document.getElementById("myButton");

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

        document.getElementById('modalInfo').addEventListener('hidden.bs.modal', function () {
            inputTarea.focus();
        });
        
        // evento click del table tarea
        idTblTarea.addEventListener('click',(event) => {

            // identificar elemento que fue clickeado
            if(event.target.tagName === 'BUTTON' || event.target.tagName === 'I'){
                let element = event.target.tagName === 'BUTTON' ? event.target : event.target.parentElement;
                // ID de la tarea involucrada
                let idTarea = parseInt(element.parentElement.parentElement.children[0].innerHTML);
                // indice de la tarea involucrada en el arreglo de tareas
                let indexById = tareas.findIndex(tar => tar.id === parseInt(idTarea));
                // button clickeado
                let btnName = element.getAttribute('name');
                actualizarEstado(indexById, 'Pendiente')

                switch (true){
                    case btnName === 'btnCheck':                // button Check clickeado
                        // obtener button opuesto -> cancel
                        let btnCancel = element.parentElement.parentElement.children[2].children[1];
                        
                        // cambiar colores de button check 
                        element.classList.toggle('btn-pastel');
                        element.classList.toggle('btn-success');

                        // actualiza estado de la tarea 'Realizada'
                        if (element.classList.contains('btn-success')) actualizarEstado(indexById, 'Realizada');
                        if(btnCancel.classList.contains('btn-danger')){
                            // remueve colores de button opuesto (cancel)
                            btnCancel.classList.remove('btn-danger');
                            btnCancel.classList.add('btn-pastel');
                        }
                    break;

                    case btnName === 'btnCancel':               // button Cancel clickeado
                        // obtener button opuesto -> check
                        let btnCheck = element.parentElement.parentElement.children[2].children[0];
                        
                        // cambiar colores de button cancel
                        element.classList.toggle('btn-pastel');
                        element.classList.toggle('btn-danger');

                        // actualiza estado de la tarea 'Cancelada'
                        if (element.classList.contains('btn-danger')) actualizarEstado(indexById, 'Cancelada');
                        if(btnCheck.classList.contains('btn-success')){
                            // remueve colores de button opuesto (check)
                            btnCheck.classList.remove('btn-success');
                            btnCheck.classList.add('btn-pastel');
                        }
                    break;
                    case btnName === 'btnTrash':                // button Basura clickeado
                    
                    // eliminar tarea del arreglo
                    eliminarTarea(indexById);
                    break;
                }
                
                // actualiza etiqueta de tareas realizadas
                spanRealizadas.innerHTML = `Realizadas: <h3><strong> ${tareas.filter(tarea => tarea.estado === 'Realizada').length} </strong></h3>`;
            }
        });

        // evento click de button agregar tarea
        btnAgregarTarea.addEventListener('click',() => {

           agregarTarea(inputTarea.value);

            inputTarea.value = '';    
            inputTarea.focus();
        });
