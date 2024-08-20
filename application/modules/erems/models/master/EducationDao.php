<?php

/**
 * Description of EducationDao
 *
 * @author MIS
 */
class Erems_Models_Master_EducationDao extends Erems_Box_Models_App_AbDao {
    public function getAll(){
        $hasil = array();
     //   $hasil = $this->dbTable->SPExecute('sp_customerb_read');
        $hasil = array(
            array(array("totalRow"=>7)),
            array(
                array(
                    "RowNum"=>1,
                    "education_id"=>1,
                    "education"=>"SD"
                ),
                array(
                    "RowNum"=>2,
                    "education_id"=>2,
                    "education"=>"SMP"
                ),
                array(
                    "RowNum"=>3,
                    "education_id"=>3,
                    "education"=>"SMA"
                ),
                array(
                    "RowNum"=>4,
                    "education_id"=>4,
                    "education"=>"Strata 1"
                ),
                array(
                    "RowNum"=>5,
                    "education_id"=>5,
                    "education"=>"Strata 2"
                ),
                array(
                    "RowNum"=>6,
                    "education_id"=>6,
                    "education"=>"Strata 3"
                )
            )
        );
       
        return $hasil; 
    }
}

?>
