<?php

/**
 * Description of Upload
 *
 * @author tommytoban
 */
class Erems_Box_Models_App_ImageUpload {

	private $folder;
	private $extensions;
	private $errorMsg;
	private $success;
	private $prefixName;
	private $imageName;
	public static $EXT_LIST = 'jpg,jpeg,png,tif,gif,JPG,JPEG,PNG,TIF,GIF';
	//addby anas 18012021
	public static $EXT_DOC_LIST = 'jpg,jpeg,png,tif,gif,JPG,JPEG,PNG,TIF,GIF,pdf,PDF,rar,zip,7z';

	public function __construct($folder = FALSE, $prefixName = FALSE, $ext = FALSE) {
		$this->folder = $folder; // "/public/uploads/"
		$this->extensions = $ext; // "jpg,gif"
		$this->success = FALSE;
		$this->prefixName = $prefixName;
	}

	public function getFolder() {
		return $this->folder;
	}

	public function getExtensions() {
		return $this->extensions;
	}

	public function getErrorMsg() {
		return $this->errorMsg;
	}

	public function isSuccess() {
		return $this->success;
	}

	public function setFolder($folder) {
		$this->folder = $folder;
	}

	public function setExtensions($extensions) {
		$this->extensions = $extensions;
	}

	public function getPrefixName() {
		return $this->prefixName;
	}

	public function setPrefixName($prefixName) {
		$this->prefixName = $prefixName;
	}

	public function getImageName() {
		return $this->imageName;
	}

	public function run() {
		$upload = new Zend_File_Transfer_Adapter_Http();
		$upload->addValidator('Extension', false, array('extension1' => Erems_Box_Models_App_ImageUpload::$EXT_LIST,
			'case' => true));
		/*
		  $upload->addValidator('Extension', false, array('extension1' => $this->extensions,
		  'case' => true));
		 */
		$this->imageName = $this->prefixName . time() . '.jpg';
		$upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/..' . $this->folder . $this->imageName, 'overwrite' => true));

		try {
			$upload->receive();
			//var_dump($upload->getErrors());
			$er = $upload->getErrors();
			if (count($er) > 0) {
				$this->errorMsg = $er[0];
				$this->imageName = FALSE;
			} else {
				$this->success = TRUE;
			}
		} catch (Zend_File_Transfer_Exception $e) {

			$this->errorMsg = $e->getMessage();
		}
	}

	//addby anas 18012021
	public function runDocument($specificEXT = '', $validatorEXT=true) {

		## ADD BY RH 20220627 ##
		$ext = Erems_Box_Models_App_ImageUpload::$EXT_DOC_LIST;
		if ($specificEXT != '') {
			$ext = $specificEXT;
		}

		$upload = new Zend_File_Transfer_Adapter_Http();
		if($validatorEXT){
			$upload->addValidator('Extension', false, array('extension1' => $ext, 'case' => true));
		}
		
		$this->imageName = $this->prefixName . time() . '.' . $this->extensions;

		$upload->addFilter('Rename', array('target' => APPLICATION_PATH . '/..' . $this->folder . $this->imageName, 'overwrite' => true));

		try {

			$upload->receive();
			$er = $upload->getErrors();

			if (count($er) > 0) {
				//updated by anas 25012021
				$error = "";

				if ($er[0] == "fileExtensionFalse") {
					$error = "File type must be jpg, jpeg, png, tif, gif, pdf, rar, zip, 7z";
					if ($specificEXT != '') {
						$error = "File type must be " . $specificEXT;
					}
				} else {
					$error = $er[0];
				}

				// $this->errorMsg = $er[0];
				$this->errorMsg = $error;
				$this->imageName = FALSE;
			} else {
				$this->success = TRUE;
			}
		} catch (Zend_File_Transfer_Exception $e) {

			$this->errorMsg = $e->getMessage();
		}
	}

}
