<?php

/**
 * Description of Banding
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_Banding extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Performancemanagement_BandingDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Performancemanagement_Banding();
    }

    public function getTableClassName() {
        return "banding";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
        return $hasil;
    }  
    
    protected function getMethod($object){
        return $this->getDao()->getAllCat($object);
    }

    // added by Michael 2021.05.19
    protected function getMethod_CustomProjectPt($object,$data) {
        // $data = $this->getDao()->getAllWOPL($object);

        $data = $this->getDao()->getAllWOPL_CustomProjectPt($object,$data);

        $totalrow = $data[0][0]['totalRow'];
        $result = $data[1];
        $name = array();
        foreach ($result as $key => $row) {
            $name[$key] = $row['banding_id'];
        }
        //print_r($return);
        array_multisort($name, SORT_ASC, $result);
        $return = array(array(array("totalRow" => $totalrow)), $result);
        return $return;
    }
    // end added by Michael 2021.05.19
}

?>
