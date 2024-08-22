import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalGenericComponent } from 'src/app/component/modal-generic/modal-generic.component';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlertService } from 'src/app/shared/services/alert/sweet-alert.service';
import { TareaService } from 'src/app/shared/services/tarea/tarea.service';
import { LoaderComponent } from 'src/app/shared/component/loader/loader.component';


@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [DataTablesModule,
    FormsModule,
    ModalGenericComponent,
    LoaderComponent,],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.scss'
})
export class TareasComponent {

  msjService = inject(SweetAlertService);
  datosTareas: any[] = [];
  public loading: boolean = false;
  showTarea: boolean = false;
  showUpdateTarea: boolean = false;
  //dtOptions: DataTables.Settings = {};
  tareaService = inject(TareaService);
  dataSave: any = {
    titulo: "",
    descripcion: "",
    completado: false,
    usuarioCreacion: 0
  };
  dataUpdate: any = {
    titulo: "",
    descripcion: "",
    usuarioModificacion: 0
  };
  userId: number = 0;


  async ngOnInit() {
    
    const usuarioString = localStorage.getItem('user');

    if (usuarioString) {

      const usuario = JSON.parse(usuarioString);
      this.userId = usuario.id;
      console.log("USUARIO LOGUEADO: ", this.userId)
    }

    await this.getInfoTareas();
  }

  async getInfoTareas() {
    this.datosTareas = []
    this.loading = true;
    const resp = await this.tareaService.traerTareas();
    this.loading = false
    if (resp.error) {
      this.msjService.error("","Ocurrio un error al obtener la Información de las tareas");
      return;
    }
    this.datosTareas = resp || [];

    console.log("INFO TAREAS YA PARSEADAS: ", this.datosTareas)
  }

  async save()
  {
    if (this.dataSave.titulo.trim() === "" || this.dataSave.descripcion.trim() === "")
    {
      this.msjService.warning("","Debe de ingresar todos los campos");
      return;
    }

    const confim = await this.msjService.question("",
      `Esta seguro que los datos proporcionados son los correctos?`
    );

    if (confim) {
      this.loading = true;

      this.dataSave.titulo = this.dataSave.titulo.trim();
      this.dataSave.descripcion = this.dataSave.descripcion.trim();
      this.dataSave.usuarioCreacion = this.userId;


      console.log("DATOS ENVIADOS: ", this.dataSave)

      const resp = await this.tareaService.createTarea(this.dataSave);

      console.log("RESPUESTA GUARDAR: ", resp)

      if (resp.error) {
        this.msjService.error("", "Problema al procesar la solicitud");
        this.loading = false;
        return;
      }

      this.msjService.success("", "Proceso realizado con éxito");

      

      this.dataSave = {
        titulo: "",
        descripcion: "",
        completado: false,
        usuarioCreacion: 0
      };

      await this.getInfoTareas();

      this.showTarea = false;
      this.loading = false;

    }

  }

  async update()
  {

    if (this.dataUpdate.titulo.trim() === "" || this.dataUpdate.descripcion.trim() === "")
    {
      this.msjService.warning("","Debe de ingresar todos los campos");
      return;
    }

    const confim = await this.msjService.question("",
      `Esta seguro que los datos proporcionados son los correctos?`
    );

    if (confim) {
      this.loading = true;

      this.dataUpdate.titulo = this.dataUpdate.titulo.trim();
      this.dataUpdate.descripcion = this.dataUpdate.descripcion.trim();
      this.dataUpdate.usuarioModificacion = this.userId;

      const resp = await this.tareaService.updateTarea(this.dataUpdate);

      if (resp.error) {
        this.msjService.error("", "Problema al procesar la solicitud");
        this.loading = false;
        return;
      }

      this.msjService.success("", "Proceso realizado con éxito");

      this.dataUpdate = {
        titulo: "",
        descripcion: "",
        usuarioModificacion: 0
      };

      await this.getInfoTareas();

      this.showUpdateTarea = false;
      this.loading = false;

    }

  }

  async close()
  {
    this.dataSave = {
      titulo: "",
      descripcion: "",
      completado: false,
      usuarioCreacion: 0
    };

    this.dataUpdate = {
      titulo: "",
      descripcion: "",
      usuarioModificacion: 0
    };
    
    this.showTarea = false;
    this.showUpdateTarea = false;
  }

  async updateCompletado(tareaId: number, event: Event){

    this.loading = true;

    const isCompleted = (event.target as HTMLInputElement).checked;

    const param = { id: tareaId, completado: isCompleted }

    const resp = await this.tareaService.changeTarea(param);

    await this.getInfoTareas();

    this.loading = false;

  }

  async updateEstado(estadoId: number)
  {
    this.loading = true;

    const param = { id: estadoId, estado: "I" }

    const resp = await this.tareaService.changeEstadoTarea(param);

    await this.getInfoTareas();

    this.loading = false;
  }

}
