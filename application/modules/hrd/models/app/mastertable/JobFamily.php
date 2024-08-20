<?php

/**
 * Description of Job Family
 *
 * @author MIS
 */
class Hrd_Models_App_Mastertable_JobFamily extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Performancemanagement_JobFamilyDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Performancemanagement_JobFamily();
    }

    public function getTableClassName() {
        return "jobfamily";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
        return $hasil;
    }  

    
   /*	
    protected function getMethod($object){
        return $this->getDao()->getAllJob($object);
    }
   */


  protected function getMethod($object) {
        $data = $this->getDao()->getAllJob($object);
        $totalrow = $data[0][0]['totalRow'];
        $result = $data[1];
        $name = array();
        foreach ($result as $key => $row) {
            $name[$key] = $row['code'];
        }
        array_multisort($name, SORT_ASC, $result);
        $return = array(array(array("totalRow" => $totalrow)), $result);
        return $return;
    }


}

?>
