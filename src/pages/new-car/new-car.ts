import {Component} from "@angular/core";
import {ActionSheetController, NavController, NavParams, Platform} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilitService} from "../../services/utilit-service";
import {DashboardPage} from "../dashboard/dashboard";
import {Camera} from '@ionic-native/camera';
//import {Transfer} from "@ionic-native/transfer";
//import {FilePath} from "@ionic-native/file-path";
import {CarProvider} from "../../providers/car/car";
import {TYPES} from "../../services/mock-vehicle-types";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {Env} from "../../../config/env";

//declare let cordova: any;

@Component({
  selector: 'page-new-car',
  templateUrl: 'new-car.html'
})
export class NewCarPage {

  carForm: FormGroup;
  lastImage: any = null;
  Id: string;
  headerText: string = 'New';
  public Types: object = TYPES;
  public env: any = Env;

  constructor(public nav: NavController,
              public carService: CarProvider,
              public formBuilder: FormBuilder,
              public utilit: UtilitService,
              //private transfer: Transfer,
              private camera: Camera,
              //private file: File,
              //private filePath: FilePath,
              private transfer: FileTransfer,
              public actionSheetCtrl: ActionSheetController,
              public platform: Platform,
              navParams: NavParams) {
    this.carForm = formBuilder.group({
      _id: [''],
      image: [''],
      name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      type: ['', Validators.compose([Validators.required])],
      model: ['', Validators.compose([Validators.required])],
      make: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{2,4}$')])],
      plate: ['', Validators.compose([Validators.required])],
      city_price: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,9}$')])],
      other_price: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,9}$')])],
      driver_price: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,9}$')])],
      description: [''],
    });

    this.Id = navParams.get('Id');
    console.log(this.Id);
    if (this.Id) {
      this.headerText = 'Update';
    }
    this.getVehicle();
  }

  private getVehicle() {
    if (this.Id) {
      this.utilit.showLoader();

      this.carService.getVehicle({Id: this.Id}).then((res) => {

        this.carForm.patchValue(res['msg']);
        this.lastImage = res['msg']['image'];
        this.utilit.hideLoader();

      }, (err) => {
        this.utilit.hideLoader();
      });
    }
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return img;
    }
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    let options = {
      sourceType: sourceType,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      this.lastImage = "data:image/jpeg;base64," + imagePath;
    }, (err) => {
      this.utilit.showToast({
        message: 'Error while selecting image',
        duration: 3000,
        position: 'bottom',
      });
    });
  }

  onSubmit(value: any): void {

    if (this.carForm.valid) {

      this.utilit.showLoader();

      this.carService.addVehicle(this.carForm.value).then((result) => {

        this.utilit.hideLoader();
        console.log(result);

        this.utilit.showToast({
          message: result['msg'],
          duration: 2000,
          position: 'top',
        });

        this.nav.setRoot(DashboardPage);

      }, (err) => {

        this.utilit.hideLoader();
        console.log(err);

        this.utilit.showToast({
          message: err.error.msg + '. Please try again',
          duration: 5000,
          position: 'bottom',
          cssClass: 'dark-trans',
          closeButtonText: 'OK',
          showCloseButton: true
        });

      });

    }
  }

  uploadImage(img) {
    // File for Upload
    let options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      fileName: 'ionicfile',
      mimeType: 'multipart/form-data',
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    this.utilit.showLoader();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(img, this.env.baseURL + '/uploadimage', options).then((data) => {

      this.utilit.hideLoader();
      this.lastImage = data['msg'];

    }, (err) => {

      this.utilit.hideLoader();

      this.utilit.showToast({
        message: err.error.msg + '. Please try again',
        duration: 2000,
        position: 'bottom',
      });

    });
  }
}
