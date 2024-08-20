<?php

/**
 * Description of TrainingProcessor
 *
 * @author MIS
 */
class Hrd_Models_App_Box_TrainingProcessor extends Hrd_Models_App_Box_Processor {
    
    public function __construct($testingFlag = NULL) {
        parent::__construct($testingFlag);
        $this->frontDetailFill = TRUE; // set true untuk isi detail sebelum validasi
    }
    
  

   

    public function daoSave($dao, $object) {

        // create absen harian per karyawan
        
        $decanDate = NULL;
        
  
        
        if ($object instanceof Hrd_Models_Training_Training) {
            $data = $this->getData();

            $startDate = new DateTime($data["scheduletraining_start_date"]);
           

            $endDate = $data["scheduletraining_end_date"];

            $dateDiff = Box_Tools::timeDifferenceB($data["scheduletraining_start_date"], $data["scheduletraining_end_date"]);
            $jumlahHari = $dateDiff->format("%a");


            $allEmployee = $object->getEmployee();
            $allDate = array();
            
            
            if (count($allEmployee) > 0) {
                foreach ($allEmployee as $em) {
                    for ($i = 0; $i <= $jumlahHari; $i++) {
                        $date = new Hrd_Models_Training_DetailDate();
                        $newDate = new DateTime($data["scheduletraining_start_date"]);
                        $newDate->add(new DateInterval('P'.$i.'D'));
                        $date->getTrainingDetail()->setId($em->getEmployee()->getId());
                        $date->setDate($newDate->format("Y-m-d"));
                        $allDate[] = $date;
                       // var_dump($date->getDate());
                    }
                }
            }
            
          
            
            if(count($allDate) > 0){
                $decanDate = Box_Tools::toDecan($allDate);
                
            }
        }

        return $dao->save($object,$decanDate);
    }

    public function daoUpdate($dao, $training) {

        $data = $this->getData();
        $de = new Erems_Box_Delien_DelimiterEnhancer();
        $decan = new Erems_Box_Models_App_Decan(explode(",", $data["deletedRows"]));
        $de->setDelimiterCandidate($decan);
        $de->generate();

        return $dao->update($training, $decan);
    }

}

?>
