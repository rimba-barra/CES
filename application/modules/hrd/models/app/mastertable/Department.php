<?php

/**
 * Description of Department
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_Department extends Box_Models_App_Masterdata_Masterdata{
    private $request;
    public function setRequest($r){
        $this->request = $r;
    }
    public function getDao() {
        return new Hrd_Models_Master_DepartmentDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_Department();
    }

    public function getTableClassName() {
        return "department";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
      
        return $hasil;
    }    //put your code here
    
	/*
    protected function getMethod($object){
        return $this->getDao()->getAllWOPL($object);
    }
	*/
	protected function getMethod($object) {
        $data = $this->getDao()->getAllWOPL($object);
        $totalrow = $data[0][0]['totalRow'];
        $result = $data[1];
        $name = array();
        foreach ($result as $key => $row) {
            $name[$key] = $row['department'];
        }
        //print_r($return);
        array_multisort($name, SORT_ASC, $result);
        $return = array(array(array("totalRow" => $totalrow)), $result);
        return $return;
    }

    // added by Michael 2021.05.19
    protected function getMethod_CustomProjectPt($object,$data) {
        // $data = $this->getDao()->getAllWOPL($object);

        $data = $this->getDao()->getAllWOPL_CustomProjectPt($object,$data);

        $totalrow = $data[0][0]['totalRow'];
        $result = $data[1];
        $name = array();
        foreach ($result as $key => $row) {
            $name[$key] = $row['department'];
        }
        //print_r($return);
        array_multisort($name, SORT_ASC, $result);
        $return = array(array(array("totalRow" => $totalrow)), $result);
        return $return;
    }
    // end added by Michael 2021.05.19

    // added by Michael 2022-12-27 | ambil dari FAMS
    protected function getMethod_Fams($object,$data) {
        // $data = $this->getDao()->getAllWOPL($object);

        $data = $this->getDao()->getAllWOPL_Fams($object,$data);

        $totalrow = $data[0][0]['totalRow'];
        $result = $data[1];
        $name = array();
        foreach ($result as $key => $row) {
            $name[$key] = $row['department'];
        }
        //print_r($return);
        array_multisort($name, SORT_ASC, $result);
        $return = array(array(array("totalRow" => $totalrow)), $result);
        return $return;
    }
    // end added by Michael 2022-12-27 | ambil dari FAMS
}

?>
