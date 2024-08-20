<?php

/**
 * Description of ExportExcel
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_Models_Master_CustomerExcel {

    private $fileResult;
    private $objPHPExcel;

    private $url;
    private $projectId;
    private $ptId;
    private $userId;
    

    function __construct($projectId,$ptId,$userId) {
        $this->projectId = $projectId;
        $this->ptId = $ptId;
        $this->userId = $userId;
       
      
    }

    

    public function process($fileexcel) {
            $objPHPExcel = new PHPExcel();

          // load excel
            $file = $fileexcel; //
          
            $load = PHPExcel_IOFactory::load($file);
//            $sheets = $load->getActiveSheet()->toArray(null,true,true,true);
            $maxCell = $load->setActiveSheetIndex(0)->getHighestRowAndColumn();
            $sheets = $load->setActiveSheetIndex(0)->rangeToArray('A1:' . $maxCell['column'] . $maxCell['row']);
            $i = 1;
            $result['data'] = '';
            $result['status'] = 0;
            foreach ($sheets as $sheet) {
            if ($i > 1) {
                if($this->isEmptyRow($sheet) == false) {
                    $save_data = new Erems_Models_Master_CustomerDao();
                    $proses = $save_data->importexcel($sheet,$this->projectId,$this->ptId,$this->userId);
                    if($proses['status'] == 1) {
                        $result['data']  .= '<br>'.$proses['data'];
                        $result['status'] = 1;
                    }
                    
                } 
            }
             $i++;
            }

            
          
//          $i = 1;
//
//          $result['data'] = '';
//          $result['status'] = 0;
//          foreach ($sheets as $sheet) {
//            if ($i > 1) {
//              $save_data = new Erems_Models_Master_CustomerDao();
//              $proses = $save_data->importexcel($sheet,$this->projectId,$this->ptId,$this->userId);
//              if($proses['status'] == 1) {
//                $result['data']  .= '<br>'.$proses['data'];
//                $result['status'] = 1;
//              }
//              
//            }
//
//            $i++;
//          }
//
            return $result;
    }
    
    function isEmptyRow($row) {
        foreach($row as $cell){
            if (null !== $cell) {
              return false;  
            } 
        }
        return true;
    }
    
    public function getUrl() {
        return $this->url;
    }

}
?>
