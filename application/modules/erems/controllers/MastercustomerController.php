<?php

class Erems_MastercustomerController extends Erems_Box_Models_App_Hermes_AbstractController {

	function init() {
		$this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
	}

	protected function testingFlag() {
		return FALSE;
	}

	public function allRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();

		$dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array());
		$dao = new Erems_Models_Master_CustomerDao();

		$hasil = $dao->getAllByFilter($this->getAppRequest(), $this->getAppSession());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	// public function savedocumentRead() {
	//     $hasil = FALSE;
	//     $msg = "Proses...";
	//     $params = $this->getAppData();
	//     $params = json_decode($params["data"],true);
	//     $newDocument = new Erems_Models_Customer_CustomerDocument();
	//     $newDocument->setArrayTable($params);
	//     $valid = FALSE;
	//     if($newDocument->getCustomer()->getId()==0){
	//         $msg = "Invalid customer";
	//     }else if($newDocument->getDocumentType()->getId()==0){
	//         $msg = "Invalid document type";
	//     }else{
	//         $valid = TRUE;
	//     }
	//     /*Check isApprove*/
	//     $daoCr = new Erems_Models_Master_CustomerrevisionDao(); 
	//     if(isset($params["customer_id"])){
	//         $customer_tmp_id = $daoCr->getNewRevisionId($params["customer_id"]);
	//         $isApprove = $this->approvalcheck($customer_tmp_id);
	//     }else{
	//         $isApprove = true;
	//     }
	//     $daoC = new Erems_Models_Master_CustomerDao(); 
	//     $sess =  array(
	//                     "projectId"=>$this->getAppSession()->getProject()->getId(),
	//                     "ptId" => $this->getAppSession()->getPt()->getId()
	//                     );
	//     $object = 0;
	//     $isRevisionActive = $daoC->isCustomerRevisionActive($sess);
	//     if($isRevisionActive==false){
	//         $isApprove = false;
	//     }
	//     /* end check isApprove*/
	//     if ($valid) {
	//        $dao = new Erems_Models_Master_CustomerDocumentDao();
	//        if($newDocument->getId() > 0){
	//            $newDocument->setModiBy($this->getAppSession()->getUser()->getId());
	//            if($isApprove){
	//                 $hasil = $dao->updateTmp($newDocument);
	//            }else{
	//                 $hasil = $dao->update($newDocument);
	//            }
	//        }else{
	//            $newDocument->setAddBy($this->getAppSession()->getUser()->getId());
	//            if($isApprove){
	//                 $hasil = $dao->saveTmp($newDocument);
	//            }else{
	//                 $hasil = $dao->save($newDocument);
	//            }
	//        }
	//     }
	//     $arrayRespon = array("HASIL" => $hasil,
	//         "MSG" => $msg);
	//     return Erems_Box_Tools::instantRead($arrayRespon, array());
	// }
	//updated by anas 27012021
	//tanpa check approval dan langsung save ke real
	public function savedocumentRead() {

		$hasil = FALSE;
		$msg = "Proses...";

		$params = $this->getAppData();
		$params = json_decode($params["data"], true);
		$newDocument = new Erems_Models_Customer_CustomerDocument();
		$newDocument->setArrayTable($params);

		$valid = FALSE;

//        if($newDocument->getCustomer()->getId()==0){
//            $msg = "Invalid customer";
//        } 
		if ($newDocument->getDocumentType()->getId() == 0) {
			$msg = "Invalid document type";
		} else {
			$valid = TRUE;
		}

		if ($valid) {
			$dao = new Erems_Models_Master_CustomerDocumentDao();
			if ($newDocument->getId() > 0) {
				$newDocument->setModiBy($this->getAppSession()->getUser()->getId());
				$hasil = $dao->update($newDocument);
			} else {
				$newDocument->setAddBy($this->getAppSession()->getUser()->getId());
				$hasil = $dao->save($newDocument);
			}
		}

		$arrayRespon = array("HASIL" => $hasil,
			"MSG" => $msg);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	// public function deletedocumentRead() {
	//     $hasil = FALSE;
	//     $msg = "Proses...";
	//     $params = $this->getAppData();
	//     $id = intval($params["customerdocument_id"]);
	//     /*Check isApprove*/
	//     $daoCr = new Erems_Models_Master_CustomerrevisionDao(); 
	//     if(isset($params["customer_id"])){
	//         $customer_tmp_id = $daoCr->getNewRevisionId($params["customer_id"]);
	//         $isApprove = $this->approvalcheck($customer_tmp_id);
	//     }else{
	//         $isApprove = true;
	//     }
	//     $daoC = new Erems_Models_Master_CustomerDao(); 
	//     $sess =  array(
	//                     "projectId"=>$this->getAppSession()->getProject()->getId(),
	//                     "ptId" => $this->getAppSession()->getPt()->getId()
	//                     );
	//     $object = 0;
	//     $isRevisionActive = $daoC->isCustomerRevisionActive($sess);
	//     if($isRevisionActive==false){
	//         $isApprove = false;
	//     }
	//     /* end check isApprove*/
	//     if($id==0){
	//         $msg = "Invalid document id";
	//     }else{
	//         $dao = new Erems_Models_Master_CustomerDocumentDao();
	//       if($isApprove){
	//             $hasil = $dao->deleteOneTmp($this->getAppSession()->getUser()->getId(), $id);
	//        }else{
	//             $hasil = $dao->deleteOne($this->getAppSession()->getUser()->getId(), $id);
	//        }
	//     }
	//     $arrayRespon = array("HASIL" => $hasil,
	//         "MSG" => $msg);
	//     return Erems_Box_Tools::instantRead($arrayRespon, array());
	// }
	//updated by anas 27012021
	//tanpa check approval dan langsung delete yang real
	public function deletedocumentRead() {

		$hasil = FALSE;
		$msg = "Proses...";

		$params = $this->getAppData();
		$id = intval($params["customerdocument_id"]);

		if ($id == 0) {
			$msg = "Invalid document id";
		} else {
			$dao = new Erems_Models_Master_CustomerDocumentDao();
			$hasil = $dao->deleteOne($this->getAppSession()->getUser()->getId(), $id);
		}

		$arrayRespon = array("HASIL" => $hasil,
			"MSG" => $msg);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function saveaddressRead() {

		$hasil = FALSE;
		$msg = "Proses...";

		$params = $this->getAppData();
		$params = json_decode($params["data"], true);
		$address = new Erems_Models_Customer_CustomerAddress();
		$address->setArrayTable($params);

		$valid = FALSE;

		if ($address->getCustomer()->getId() == 0) {
			$msg = "Invalid customer";
		} else if (strlen($address->getAddress()) < 3) {
			$msg = "Addrress minimum 3 characters";
		} else {
			$valid = TRUE;
		}

		/* Check isApprove */
		$daoCr = new Erems_Models_Master_CustomerrevisionDao();
		if (isset($params["customer_id"])) {
			$customer_tmp_id = $daoCr->getNewRevisionId($params["customer_id"]);
			$isApprove = $this->approvalcheck($customer_tmp_id);
		} else {
			$isApprove = true;
		}

		$daoC = new Erems_Models_Master_CustomerDao();
		$sess = array(
			"projectId" => $this->getAppSession()->getProject()->getId(),
			"ptId" => $this->getAppSession()->getPt()->getId()
		);
		$object = 0;
		$isRevisionActive = $daoC->isCustomerRevisionActive($sess);

		if ($isRevisionActive == false) {
			$isApprove = false;
		}

		if ($valid) {
			$dao = new Erems_Models_Master_CustomerAddressDao();
			if ($address->getId() > 0) {
				$address->setModiBy($this->getAppSession()->getUser()->getId());
				$istmp = true;
				if ($isApprove) {
					$hasil = $dao->updateTmp($address);
				} else {
					$hasil = $dao->update($address);
				}
			} else {
				$address->setAddBy($this->getAppSession()->getUser()->getId());
				if ($isApprove) {
					$hasil = $dao->saveTmp($address);
				} else {
					$hasil = $dao->save($address);
				}
			}
		}

		$arrayRespon = array("HASIL" => $hasil,
			"MSG" => $msg);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function deleteaddressRead() {

		$hasil = FALSE;
		$msg = "Proses...";

		$params = $this->getAppData();
		$id = intval($params["customeraddress_id"]);

		/* Check isApprove */
		$daoCr = new Erems_Models_Master_CustomerrevisionDao();
		if (isset($params["customer_id"])) {
			$customer_tmp_id = $daoCr->getNewRevisionId($params["customer_id"]);
			$isApprove = $this->approvalcheck($customer_tmp_id);
		} else {
			$isApprove = true;
		}

		if ($id == 0) {
			$msg = "Invalid address id";
		} else {
			$dao = new Erems_Models_Master_CustomerAddressDao();

			if ($isApprove) {
				$hasil = $dao->deleteOneTmp($this->getAppSession()->getUser()->getId(), $id);
			} else {
				$hasil = $dao->deleteOne($this->getAppSession()->getUser()->getId(), $id);
			}
		}

		$arrayRespon = array("HASIL" => $hasil,
			"MSG" => $msg);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function detailRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$creator = new Erems_Box_Models_App_Creator();

		//===== MASTERDATA == //
		/// salesman 
		$dao = new Erems_Models_Hrd_EmployeeDao();
		$employee = new Erems_Models_Sales_Salesman();
		$employee->setProject($this->getAppSession()->getProject());
		$employee->setPt($this->getAppSession()->getPt());
		$hasil = $dao->getAll($employee);

		$allSalesman = array();
		$this->fillData($hasil[1], $allSalesman, $creator, 'salesman');

		/// collector 
		$dao = new Erems_Models_Hrd_EmployeeDao();
		$employee = new Erems_Models_Sales_Collector();
		$employee->setProject($this->getAppSession()->getProject());
		$employee->setPt($this->getAppSession()->getPt());
		$hasil = $dao->getAll($employee);

		$allCollector = array();
		$this->fillData($hasil[1], $allCollector, $creator, 'collector');

		$masterReligion = new Erems_Models_App_Masterdata_Religion();
		$allRelg = $masterReligion->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterEdc = new Erems_Models_App_Masterdata_Education();
		$allEdc = $masterEdc->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterCity = new Erems_Models_App_Masterdata_City();
		$allCty = $masterCity->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterPurp = new Erems_Models_App_Masterdata_Purpose();
		$allPurp = $masterPurp->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterPurpBuy = new Erems_Models_App_Masterdata_PurposeBuy();
		$allPurpBuy = $masterPurpBuy->prosesDataWithSession($this->getAppSession(), TRUE);

		$mdt = new Erems_Models_App_Masterdata_DocumentType();
		$adt = $mdt->prosesDataWithSession($this->getAppSession(), TRUE);

		//=== DETAIL INFORMATION == //
		/* schedule */
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($this->getAppData());
		$hasil = $dao->getScheduleById($pl);

		$allSchedule = array();
		$this->fillData(array_key_exists(1, $hasil) ? $hasil[1] : array(), $allSchedule, $creator, 'schedule');

		/* start added by ahmad riadi 05-01-2017 */
		$masterbentukusaha = new Erems_Models_App_Masterdata_Bentukusaha();
		$databentukusaha = $masterbentukusaha->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterinstrumentpembayaran = new Erems_Models_App_Masterdata_Instrumentpembayaran();
		$datainstrumentpembayaran = $masterinstrumentpembayaran->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterdocumenttype = new Erems_Models_App_Masterdata_DocumentTypeonly();
		$datadocumenttype = $masterdocumenttype->prosesDataWithSession($this->getAppSession(), TRUE);

		$masterprovinsi = new Erems_Models_App_Masterdata_Provinsi();
		$dataprovinsi = $masterprovinsi->prosesDataWithSession($this->getAppSession(), TRUE);
		/* end added by ahmad riadi 05-01-2017 */

		//added by david 7/10/17
		$masternpwpklu = new Erems_Models_App_Masterdata_Npwpklu();
		$npwpklu = $masternpwpklu->prosesDataWithSession($this->getAppSession(), TRUE);

		$masternpwpklasusaha = new Erems_Models_App_Masterdata_Npwpklasifikasiusaha();
		$npwpklasusaha = $masternpwpklasusaha->prosesDataWithSession($this->getAppSession(), TRUE);

		//$dm->setHasil(array($allRelg,$allEdc,$allCty,$allPurp,$adt));

		/* start edited by ahmad riadi 05-01-2017 */
		$dm->setHasil(array($allRelg, $allEdc, $allCty, $allPurp, $allPurpBuy, $adt, $databentukusaha, $datainstrumentpembayaran, $datadocumenttype, $dataprovinsi, $npwpklu, $npwpklasusaha));
		/* end edited by ahmad riadi 05-01-2017 */

		return $dm;
	}

	public function maindetailRead() {
		$hasil    = FALSE;
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array('city', 'religion', 'purpose', 'purposebuy', 'education'));
		$dao      = new Erems_Models_Master_CustomerrevisionDao();
		$data     = $this->getAppData();

		if (isset($data["customer_id"])) {
			$customer_tmp_id = $dao->getNewRevisionId($data["customer_id"]);
			$isApprove       = $this->approvalcheck($customer_tmp_id);

			if ($isApprove) {
				$dao = new Erems_Models_Master_CustomerDao();
				$hasil = $dao->getById($this->getAppRequest());
			}
			else {
				$hasil = $dao->getById($customer_tmp_id);
			}
		}

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function maindetailcurrentRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array('city', 'religion', 'purpose', 'purposebuy', 'education'));
		$data = $this->getAppData();
		$dao = new Erems_Models_Master_CustomerDao();
		$hasil = $dao->getById($this->getAppRequest());
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);
		return $dm;
	}

	public function maindetailrevisionRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array('city', 'religion', 'purpose', 'purposebuy', 'education'));
		$dao = new Erems_Models_Master_CustomerrevisionDao();
		$data = $this->getAppData();

		//  $projectId = $this->getAppSession()->getProject()->getId();

		$hasil = $dao->getById($data['customer_tmp_id']);
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);
		return $dm;
	}

	public function mainapproverevisionRead() {
		$params = $this->getAppData();

		$newRevision = new Erems_Models_Master_CustomerProfile();
		$newRevision->setArrayTable($params);

		$dao = new Erems_Models_Master_CustomerrevisionDao();
		$hasil = 0;
		if ($params['customer_id'] > 0) {
			$customer_tmp_id = $params['customer_tmp_id'];
			$newRevision->setAddBy($this->getAppSession()->getUser()->getId());
			$hasil = $dao->approve($newRevision, $customer_tmp_id);
		}
		$arrayRespon = array(
			"HASIL" => $hasil
		);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function mainrejectrevisionRead() {
		$params = $this->getAppData();

		$newRevision = new Erems_Models_Master_CustomerProfile();
		$newRevision->setArrayTable($params);

		$dao = new Erems_Models_Master_CustomerrevisionDao();
		$hasil = 0;
		if ($params['customer_id'] > 0) {
			$customer_tmp_id = $params['customer_tmp_id'];
			$newRevision->setAddBy($this->getAppSession()->getUser()->getId());
			$hasil = $dao->reject($newRevision, $customer_tmp_id);
		}
		$arrayRespon = array(
			"HASIL" => $hasil
		);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function checkuserRead() {
		$params       = $this->getAppData();
		$superuserIDs = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), 'CUSTOMERREVISION_SUPERUSER');
		$currentID    = $this->getAppSession()->getUser()->getId();

		if (is_array($superuserIDs)) {
			$superuserIDs = $superuserIDs;
		} else {
			$superuserIDs = array($superuserIDs);
		}
		if (isset($superuserIDs)) {
			if (in_array($currentID, $superuserIDs)) {
				$approveBtn = true;
			} else {
				$approveBtn = false;
			}
		} else {
			$approveBtn = false;
		}
		$additional = array('REVISIONAPPROVE' => $approveBtn);
		return Erems_Box_Tools::instantRead($additional, array());
	}

	// public function documentsRead() {
	//     $dm = new Erems_Box_Models_App_Hermes_DataModel();
	//     $dataList = new Erems_Box_Models_App_DataListCreator('', 'customerdocument', array('documenttype'));
	//     // $dao = new Erems_Models_Master_CustomerDao();
	//   //  $hasil = $dao->getById($this->getAppRequest());
	//     $params = $this->getAppData();
	//     $dao = new Erems_Models_Master_CustomerDocumentDao();
	//     /*Check isApprove*/
	//     $data = $this->getAppData();     
	//     /*Filter Pertama*/
	//     $customer_document_id = $dao->getIsNewRevisionDocument($params["customer_id"]);
	//     $isApprove = $this->approvalcheck($customer_document_id);
	//     /*Filter Kedua*/
	//     if($isApprove==true){
	//         $daoCr = new Erems_Models_Master_CustomerrevisionDao();
	//         $customer_tmp_id = $daoCr->getNewRevisionId($params["customer_id"]);
	//         $isApprove = $this->approvalcheck($customer_tmp_id);
	//     }
	//     //jika belum approve, tampilkan customer documents tmp
	//     if($isApprove==false){
	//         $hasil = $dao->getAllByCustomerWOPLTmp($params["customer_id"]);
	//     }else{
	//         $hasil = $dao->getAllByCustomerWOPL($params["customer_id"]);
	//     }
	//     $dm->setDataList($dataList);
	//     $dm->setHasil($hasil);
	//     return $dm;
	// }
	//updated by anas 01022021
	//langsung read data dokumen yang real
	public function documentsRead() {

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'customerdocument', array('documenttype'));

		$params = $this->getAppData();
		$dao = new Erems_Models_Master_CustomerDocumentDao();

		$hasil = $dao->getAllByCustomerWOPL($params);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function addressRead() {


		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'customeraddress', array());

		$dao = new Erems_Models_Master_CustomerAddressDao();

		/* Check isApprove */
		$params = $this->getAppData();

		/* Filter Pertama */
		$customer_address_id = $dao->getIsNewRevisionAddress($params["customer_id"]);
		$isApprove = $this->approvalcheck($customer_address_id);

		/* Filter Kedua */
		if ($isApprove == true) {
			$daoCr = new Erems_Models_Master_CustomerrevisionDao();
			$customer_tmp_id = $daoCr->getNewRevisionId($params["customer_id"]);
			$isApprove = $this->approvalcheck($customer_tmp_id);
		}

		//jika belum approve, tampilkan customer address tmp
		if ($isApprove == false) {
			$hasil = $dao->getAllByCustomerWOPLTmp($params["customer_id"]);
		} else {
			$hasil = $dao->getAllByCustomerWOPL($params["customer_id"]);
		}

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function mainCreate() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$obj = new Erems_Models_Master_CustomerProfile();
		$v = new Erems_Models_Customer_Validator();
		$v->setSes($this->getAppSession());
		$dm->setDao(new Erems_Models_Master_CustomerDao());

		$dm->setValidator($v);
		$dm->setObject($obj);

		return $dm;
	}

	function uploadAction() {
		$app = new Erems_Box_Models_App_Models_Create($this);
		$msg = '???';
		$success = FALSE;
		$imageUpload = NULL;

		if ($this->getRequest()->getPost('mode') == "document") {

			//updated by anas 02022021
			$file = $_FILES['file_browse'];
			$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
			// $sizefile = $file['size'];

			$imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/customerdocuments/", "document_", $ext);
			$imageUpload->runDocument();
		} else if ($this->getRequest()->getPost('mode') == "photo") {
			$imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/customer/", "customer_", "jpg,bmp");
			$imageUpload->run();
		} else if ($this->getRequest()->getPost('mode') == "ktp") {
			$imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/customerdocuments/", "documentktp_", "jpg,bmp");
			$imageUpload->run();
		} else if ($this->getRequest()->getPost('mode') == "npwp") {
			$imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/customerdocuments/", "documentnpwp_", "jpg,bmp");
			$imageUpload->run();
		}

		if (!$imageUpload->isSuccess()) {
			$msg = $imageUpload->getErrorMsg();
		} else {
			$success = TRUE;

			if ($this->getRequest()->getPost('mode') == "ktp") {
				$urlOCR = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->urlOCRKTP();
				$curl = curl_init();
				curl_setopt_array($curl, array(
					CURLOPT_URL => $urlOCR . APPLICATION_PATH . '/..' . $imageUpload->getFolder() . $imageUpload->getImageName(),
					CURLOPT_RETURNTRANSFER => true,
					CURLOPT_ENCODING => '',
					CURLOPT_MAXREDIRS => 10,
					CURLOPT_TIMEOUT => 0,
					CURLOPT_FOLLOWLOCATION => true,
					CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
					CURLOPT_CUSTOMREQUEST => 'GET',
					CURLOPT_SSL_VERIFYPEER => false,
					CURLOPT_HTTPHEADER => array(
						'Content-Type: application/x-www-form-urlencoded'
					),
				));

				$error_msg = "";
				$response = curl_exec($curl);
				if (curl_errno($curl)) {
					$error_msg = curl_error($curl);
				}

				curl_close($curl);

				json_decode($response);
				if (json_last_error() !== JSON_ERROR_NONE) {
					$response = json_encode([0 => ['state' => 'rejected']]);
				}
				$msg = [
					'path' => APPLICATION_PATH . '/..' . $imageUpload->getFolder() . $imageUpload->getImageName(),
					'imageName' => $imageUpload->getImageName(),
					'hasil' => $response,
					'error_msg' => $error_msg != "" ? "Service OCR Down, silakan hubungi IT Kantor Pusat" : ""
				];
			} else if ($this->getRequest()->getPost('mode') == "npwp") {
				$urlOCR = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId())->urlOCRNPWP();
				$curl = curl_init();
				curl_setopt_array($curl, array(
					CURLOPT_URL => $urlOCR . APPLICATION_PATH . '/..' . $imageUpload->getFolder() . $imageUpload->getImageName(),
					CURLOPT_RETURNTRANSFER => true,
					CURLOPT_ENCODING => '',
					CURLOPT_MAXREDIRS => 10,
					CURLOPT_TIMEOUT => 0,
					CURLOPT_FOLLOWLOCATION => true,
					CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
					CURLOPT_CUSTOMREQUEST => 'GET',
					CURLOPT_SSL_VERIFYPEER => false,
					CURLOPT_HTTPHEADER => array(
						'Content-Type: application/x-www-form-urlencoded'
					),
				));

				$error_msg = "";
				$response = curl_exec($curl);
				if (curl_errno($curl)) {
					$error_msg = curl_error($curl);
				}

				curl_close($curl);

				json_decode($response);
				if (json_last_error() !== JSON_ERROR_NONE) {
					$response = json_encode([0 => ['state' => 'rejected']]);
				}
				$msg = [
					'path' => APPLICATION_PATH . '/..' . $imageUpload->getFolder() . $imageUpload->getImageName(),
					'imageName' => $imageUpload->getImageName(),
					'hasil' => $response,
					'error_msg' => $error_msg != "" ? "Service OCR Down, silakan hubungi IT Kantor Pusat" : ""
				];
			} else {
				$msg = [
					'path' => APPLICATION_PATH . '/..' . $imageUpload->getFolder() . $imageUpload->getImageName(),
					'imageName' => $imageUpload->getImageName(),
				];
			}
		}

		$app->setMsg($msg);
		$app->setSuccess($success);
		$app->run();
	}

	public function mainDelete() {
		$dao = new Erems_Models_Master_CustomerDao();

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setObject(new Erems_Models_Master_CustomerProfile());
		$dm->setDao($dao);
		$dm->setIdProperty("customer_id");
		return $dm;
	}

	private function sendEmail() {

		$hasil = false;
		$msg = NULL;
		$params = $this->getAppData();
		$statusSentMail = FALSE;

		$email = filter_var($params["email"], FILTER_SANITIZE_EMAIL);

		// Validate e-mail
		if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
			$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

			$receiver           = array($params["email"], $params["nama"]);
			$receiverNotifikasi = $genco->getSPEmailNotifikasiReceiver();

			try {
				$kontenHTML = "<html><body>";
				$kontenHTML .= "<p>NOTIFIKASI EMAIL SP</p>";
				$kontenHTML .= "<p>NAMA CUSTOMER : " . $receiver[1] . "</p>";
				$kontenHTML .= "<p>EMAIL CUSTOMER : " . $receiver[0] . "</p>";
				$kontenHTML .= "<p>STATUS : " . $msg . "</p>";
				$kontenHTML .= "</body></html>";

				$var = array(
					'subject'      => '[CES EREMS] Notifikasi email Perubahan Customer',
					'is_body_html' => true,
					'content'      => $kontenHTML,
					'sender'       => Erems_Box_GlobalParams::EMAIL_USER_NOREPLY,
					'recipient'    => array('name' => $receiverNotifikasi[1], 'email' => $receiverNotifikasi[0]),
				);
				$statusSentMail = Erems_Box_Tools::emailSend($var);

				if($statusSentMail){
					$statusSentMail = TRUE;
					$msg            = "Sukses kirim email";
					$hasil          = true;
				}
				else{
					$statusSentMail = FALSE;
					$msg = "Email gagal terkirim.";	
				}
			} catch (Zend_Mail_Exception $e) {
				$statusSentMail = FALSE;
				$msg = "Email gagal terkirim.";
			}
		} else {
			$msg = "Email customer tidak valid ";
		}

		$arrayRespon = array("hasil" => $hasil, "msg" => $msg, "status_sendmail" => $statusSentMail);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	private function approvalcheck($customer_tmp_id) {
		//Check if approved?
		if ($customer_tmp_id == 0) {
			return true;
		} else {
			return false;
		}
	}

	protected function getDefaultProcessor() {
		return new Erems_Models_App_Box_MastercustomerProcessor();
	}

	function modaluploadAction() {
		$this->view->assign('data', '');
	}

	function importexcelAction() {
	   // var_dump($this->_helper->session->getUserId()); die();
		$ps = new Erems_Models_Master_CustomerExcel($this->session->getCurrentProjectId(), $this->session->getCurrentPtId(), $this->_helper->session->getUserId());
		$result = $ps->process($_FILES['filecustomer']['tmp_name']);
	   // var_dump($result);        die();
		echo Zend_Json::encode($result);

		$this->_helper->viewRenderer->setNoRender(true);
	}

}

?>
