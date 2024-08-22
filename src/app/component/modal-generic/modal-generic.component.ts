import {
  Component,
  ContentChild,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  inject,
} from "@angular/core";
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-modal-generic',
  standalone: true,
  imports: [],
  templateUrl: './modal-generic.component.html',
  styleUrl: './modal-generic.component.scss'
})
export class ModalGenericComponent {

  @Input() textTitle: string = "";
  @Input() modalSize: string = "lg";
  @Input() showFooter: boolean = true;
  @Input() FullScreen: boolean = false;
  modal: NgbModalRef; 
  modalService = inject(NgbModal);
  config = inject(NgbModalConfig);
  @ViewChild("content") contentTemplate!: TemplateRef<any>;
  constructor() {
    this.config.backdrop = "static";
    this.config.keyboard = false;
  }

  ngAfterViewInit(): void {
    this.modal = this.modalService.open(this.contentTemplate, { size: this.modalSize, fullscreen: this.FullScreen });
  }

  ngOnDestroy(): void {
    if (this.modal) {
      this.modal.close(); // Cierra el modal
    }
  }

}
