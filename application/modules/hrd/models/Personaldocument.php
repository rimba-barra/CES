<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Hrd_Models_Personaldocument extends Zend_Db_Table_Abstract {

    private $setting = null;
    private $destination = null;

    function init() {
        $this->setting = new Hrd_Models_General_Setup();
        $this->dao_emp = new Hrd_Models_Master_EmployeeDao();
        //lokasi file untuk diupload
        $this->folderapps = getcwd() . '/app/hrd/uploads/personal/';
    }

    public function processdoc($files, $data) {
        $data_employee = $this->dao_emp->getAllByIds($data['employee_id']);
        $response = array('success' => false, 'msg' => "Upload failed");
        if ($data_employee[0][0]['totalRow'] > 0) {
            $row = $data_employee[1][0];
            $employee_id = $row['employee_id'];
            //$namedata = $row['employee_id'] . '/dokumen_' . strtolower($data['type']);
            $namedata = $row['employee_id'] . '/' . strtolower($data['type']);
            $this->destination = $this->folderapps . $namedata;
            $this->createFolder();
            $name = date('Ymd') . '.pdf';
            $file_tmp = $files['file_name']['tmp_name'];
            $fullpathfile = $this->destination . '/' . $name;
            if (move_uploaded_file($file_tmp, $fullpathfile)) {
                $this->setting->_tabledata = 'm_employee';
                $document = "personal/" . $employee_id . "/" . strtolower($data['type']) . "/" . $name;
                $field = "dokumen_" . strtolower($data['type']);
                $record = array("$field" => $document);
                $whereset = array("employee_id" => $employee_id);
                $this->setting->updatedata($record, $whereset);
                $response = array('success' => true, 'msg' => strtolower($data['type']));
            }
        }
        return $response;
    }

    //added by michael 2022-07-08 request bu shirley, vaksin bisa jpg/png 
    public function processdocimg($files, $data) {
        $data_employee = $this->dao_emp->getAllByIds($data['employee_id']);
        $response = array('success' => false, 'msg' => "Upload failed");
        if ($data_employee[0][0]['totalRow'] > 0) {
            $row = $data_employee[1][0];
            $employee_id = $row['employee_id'];
            //$namedata = $row['employee_id'] . '/dokumen_' . strtolower($data['type']);
            $namedata = $row['employee_id'] . '/' . strtolower($data['type']);
            $this->destination = $this->folderapps . $namedata;
            $this->createFolder();
            $name = date('Ymd') . '.jpg';
            $file_tmp = $files['file_name']['tmp_name'];
            $fullpathfile = $this->destination . '/' . $name;
            if (move_uploaded_file($file_tmp, $fullpathfile)) {
                $this->setting->_tabledata = 'm_employee';
                $document = "personal/" . $employee_id . "/" . strtolower($data['type']) . "/" . $name;
                $field = "dokumen_" . strtolower($data['type']);
                $record = array("$field" => $document);
                $whereset = array("employee_id" => $employee_id);
                $this->setting->updatedata($record, $whereset);
                $response = array('success' => true, 'msg' => strtolower($data['type']));
            }
        }
        return $response;
    }

    function createFolder() {
        if (!file_exists($this->destination)) {
            mkdir($this->destination, 0777, true);
        }
    }

}

?>
