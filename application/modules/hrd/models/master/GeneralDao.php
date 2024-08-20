<?php

/**
 * Description of GeneralDao
 *
 * @author MIS
 */
class Hrd_Models_Master_GeneralDao extends Box_Models_App_AbDao{
    public function getEduHistory(Hrd_Models_Master_Employee $em,Box_Models_App_HasilRequestRead $r){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_educationhistory_read',$em->getId(),$r->getPage(), $r->getLimit());

        return $hasil;
    }
    
    public function getJobstory(Hrd_Models_Master_Employee $em,Box_Models_App_HasilRequestRead $r){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_jobhistory_read',$em->getId(),$r->getPage(), $r->getLimit());

        return $hasil;
    }
    
    public function getTrainingHistory(Hrd_Models_Master_Employee $em,Box_Models_App_HasilRequestRead $r){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_training_read',$em->getId(),$r->getPage(), $r->getLimit());
   
        return $hasil;
    }
    
    public function getAllJabatan(){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_jabatan_read');

        return $hasil;
    }
    
    public function getAllProject(Box_Models_App_HasilRequestRead $r,  Box_Models_Master_Project $p){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_project_read');

        return $hasil;
    }
    
    public function getCompanyProfile(Box_Models_Master_Project $project,  Box_Models_Master_Pt $pt){
         $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_company_profile',$project->getId(),$pt->getId());

        return $hasil;   
    }
    
    public function getAllEmployeeStatus(){
         $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employeestatus_read');

        return $hasil; 
    }
    
      /* start added by ahmad riadi 14-02-2018 */	
    public function getEmployeehistory(Hrd_Models_Master_Employeehistory $em,Box_Models_App_HasilRequestRead $r) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                    'sp_employeehistory_read', 
                    $r->getPage(),
                    $r->getLimit(), 
                    $em->getEmployee_id()                   
                );
        //print_r($this->dbTable);
        return $hasil;
    }
      /* end by ahmad riadi 14-02-2018 */
}

?>
