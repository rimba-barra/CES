<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */

require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel.php';

class Cashier_Models_Master_BudgetCoaDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    public function save(Cashier_Models_Master_CoaConfig $cs,$dcResult){

        $row = 0;

        if(!$cs->getAddBy()){
            return $row;
        }

        if($dcResult){

          $row = $this->dbTable->SPUpdate('sp_coaconfig_create',
              $cs->getAddBy(),
              $cs->getProject()->getId(),
              $cs->getPt()->getId(),
              $cs->getCoaCode(),
              $cs->getName(),
              $cs->getDecription(),
              $dcResult["coa_id"],
              $dcResult["code"],
              $dcResult["coa_name"],
              $dcResult["persen"],
              $dcResult["description"],
              $dcResult["type"]);

      }else{
          $row = $this->dbTable->SPUpdate('sp_coaconfig_create',
              $cs->getAddBy(),
              $cs->getProject()->getId(),
              $cs->getPt()->getId(),
              $cs->getCoaCode(),
              $cs->getName(),
              $cs->getDecription());
      }
      return $row;

  }

  public function update(Cashier_Models_Master_BudgetCoa $cs, Cashier_Box_Models_App_HasilRequestRead $req){  


    $row = 0;
    if(!$cs->getId()){
        return $row;
    }

    try {

        $row = $this->dbTable->SPUpdate('sp_all_update',
            $req->getModeRead(),
            $req->getModule(),
            $cs->getProject()->getId(),
            $cs->getPt()->getId(),
            $cs->getAddBy(),
            $req->getXmlData()
        );
        

    } catch(Exception $e) { $this->dbTable->logErrorPhp($e); }
    return $row;
}

public function getByProjectPtWithPageSearch(Cashier_Models_Master_BudgetCoa $ct,  Cashier_Box_Models_App_HasilRequestRead $request, $userid=null){
    $hasil = array();
    $project = $ct->getProject()->getId();
    $pt = $ct->getPt()->getId();
    if($project==0 || $pt==0){
        return $hasil;
    }
    $ptId = (empty($request->getOthersValue("pt_id")))?$pt:$request->getOthersValue("pt_id");

    $hasil = $this->dbTable->SPExecute('sp_all_read',
        $request->getModeRead(),
        $request->getModule(),
        $ct->getProject()->getId(),
        intval($ptId),
        $request->getPage(),
        $request->getLimit(),
        $request->getXmlValue(),
        intval($project),
        intval($userid)
    );
    return $hasil; 
}

public function getHasilGenerateCoa(Cashier_Models_Master_BudgetCoa $ct, Cashier_Box_Models_App_HasilRequestRead $request, $userid=null) {
    $hasil = array();
    $project = $ct->getProject()->getId();
    $pt = $ct->getPt()->getId();
    if($project==0 || $pt==0){
        return $hasil;
    }

    $hasil = $this->dbTable->SPExecute('sp_budgetcoagenerate_read',
        intval($request->getOthersValue("project_id")),
        intval($request->getOthersValue("pt_id")),
        intval($request->getOthersValue("year")),
        $request->getOthersValue("budget_type"),
        $userid
    );

    return $hasil; 
}

public function directDelete(Cashier_Box_Models_App_Decan $decan, Cashier_Box_Kouti_InterSession $session) {
    $row = 0;
        //$row = $this->dbTable->SPUpdate('sp_coa_config_destroy', $decan->getString(), $session->getUserId());

    return $row;
} 

public function deleteData($user, $budgetdeletedId, Cashier_Box_Models_App_HasilRequestRead $req ) {
    $row = 0;
    if(!$user) {
        return $row;
    }

    $row = $this->dbTable->SPUpdate('sp_all_destroy',
        $req->getModeRead(),
        $req->getModule(),
        intval($user),
        $budgetdeletedId);

    return $row;
} 

public function codeExist(Cashier_Models_Master_BudgetCoa $ft, Cashier_Box_Models_App_HasilRequestRead $request ){
    $hasil = 0;
    $hasil = $this->dbTable->SPExecute('sp_validator_read',
        $request->getModeRead(),
        $request->getModule(),
        $ft->getProject()->getId(),
        intval($request->getOthersValue("pt_id")),
        $ft->getCoa(),
        $ft->getYear(),
        $ft->getDepartmentId()
    );

    return $hasil;
}

public function getPt(Cashier_Box_Models_App_HasilRequestRead $request, $ses ){
    $hasil = 0;
    $hasil = $this->dbTable->SPExecute('sp_all_read',
        $request->getModeRead(),
        $request->getModule(),
        $ses->getProject()->getId(),
        $ses->getPt()->getId(),
                0, //getpage
                0, //getlimit
                $request->getXmlValue());

    return $hasil;
}

function exportData($param,$user_id=null) {

    ini_set("memory_limit", "-1");
    ini_set('max_execution_time', 0);

    $doc = new PHPExcel();

    $sheetname = '';
    $sheet = 0 ; 
    $sql = "sp_masterbudgetcoa_export";
    $col = array('budget_id','project_id','pt_id','coa_id','department_id','coa','name','department_code','year','total','jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec','budget_type');
    $titles = array('BUDGET ID','PROJECT ID','PT ID','COA ID','DEPARTMENT ID','COA','COA NAME','DEPARTMENT','YEAR','TOTAL','JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER','BUDGET TYPE');     

    $paramdata = array(
        'pt_id' => $param['pt_id'],
        'project_id' => $param['project_id'],
        'periode' => $param['periode']
    );
    $sheetname = "BudgetCOA";

    $this->_schema = "cashier.dbo";
    $datas = $this->dbTable->SPExecute($sql, $param['project_id'], $param['pt_id'], $param['periode'], $param['budget_type'],$user_id);

    if(sizeof($datas[0])>0){
        $arrayKeys = array_keys($datas[0][0]);
    }else{
        $arrayKeys = 0;
    }

    $tmp = array();
    $final = array();

        array_push($final,  $titles); //give title
        
        foreach ($datas[0] as $d) {

            //HARUS URUT SESUAI QUERY
            foreach ($arrayKeys as $key) {
                if(in_array($key, $col)){
                    array_push($tmp, $d[$key]);
                }
            }
            
            array_push($final, $tmp);
            $tmp = array();
        }

       // array_push($final, $additional['footer']);
        
        $finaldata = $final;

        if($sheet>0){
            if($doc->getActiveSheetIndex()!==$sheet){
                $doc->createSheet($sheet);
            }
        }

        $doc->setActiveSheetIndex($sheet);
        $doc->getActiveSheet()->fromArray($finaldata);
        $doc->getActiveSheet()->setTitle($sheetname);

        // foreach(range('A','Z') as $columnID) {
        //     $doc->getActiveSheet()->getColumnDimension($columnID)->setWidth(20);
        // }
        //GENERAL STYLE

        $titleArraystyle = array(
            'font' => array(
                'bold' => true,
                'color' => array('rgb' => '2F4F4F'),
                'size' => 11
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
            ),
            'borders' => array(
              'allborders' => array(
                  'style' => PHPExcel_Style_Border::BORDER_THIN
              )
          )
        ); 

        $rowstotal = $doc->getActiveSheet()->getHighestRow();

        $doc->getActiveSheet()->getColumnDimension('A')->setWidth(11);
        $doc->getActiveSheet()->getColumnDimension('B')->setWidth(11);
        $doc->getActiveSheet()->getColumnDimension('C')->setWidth(10);
        $doc->getActiveSheet()->getColumnDimension('D')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('E')->setWidth(30);
        $doc->getActiveSheet()->getColumnDimension('F')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('G')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('H')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('I')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('J')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('K')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('L')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('M')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('N')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('O')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('P')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('Q')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('R')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('S')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('T')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('U')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('V')->setWidth(15);
        $doc->getActiveSheet()->getColumnDimension('W')->setWidth(15);

        $doc->getActiveSheet()->getStyle('A1:W1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

        $doc->getActiveSheet()->getStyle('J2:V'.$rowstotal)->getNumberFormat()->setFormatCode('#,##0.00');
        $doc->getActiveSheet()->getStyle('J2:V'.$rowstotal)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
        $doc->getActiveSheet()->getStyle('D2:D'.$rowstotal)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);

        $filename = "Budget_COA_{$param['pt_name']}_{$param['periode']}";
        $filename = $this->cleanString($filename).".xlsx";
        $path = 'app/gl/uploads/'.$filename;
        $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/'.$filename;

        //READY TO WRITE
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0'); //no cache

        $objWriter = PHPExcel_IOFactory::createWriter($doc, 'Excel2007');
        $param['url'] = $path;
        //force user to download the Excel file without writing it to server's HD
        $objWriter->save($newFilePath);  

        return $param;
    }
    
    function cleanString($string) {
        $string = str_replace(' ', '_', $string); // Replaces all spaces with hyphens.
        $string = preg_replace('/[^A-Za-z0-9\-]/', '_', $string); // Removes special chars.

        return preg_replace('/-+/', '_', $string); // Replaces multiple hyphens with single one.
    }

    public function prosesupload($param)
    {
        $success = 0;
        $failed  = 0;

        $cekdata = 0;
        $z = 0;
        $lastpt = 0 ;
        $lastproject = 0 ;
        $lastyear = 0 ;
        $lastBudgetType = '' ;

        foreach ($param as $p) {
            $currentpt = $p['pt_id'];
            $currentproject = $p['project_id'];
            $currentyear = $p['year'];
            $currentBudgetType = str_replace("\n\r","",$p['budget_type']);

            if($lastpt != $currentpt || $lastproject !=  $currentproject ||  $lastyear !=  $currentyear || $lastBudgetType != $currentBudgetType ) {
                $cekdata = 0;
            }

            if ($p['department_id'] == 0) {
                $department = null;
            }else{
                $department = $p['department_id'];
            }

            if ($cekdata == 0 ) {
                $process = $this->dbTable->SPExecute(
                    'sp_masterbudgetcoa_upload', 
                    $p['project_id'],
                    $p['pt_id'],
                    $p['coa_id'],
                    $department,
                    $p['coa'],
                    $p['coa_name'],
                    $p['year'],
                    $p['total'],
                    $p['jan'],
                    $p['feb'],
                    $p['mar'],
                    $p['apr'],
                    $p['may'],
                    $p['jun'],
                    $p['jul'],
                    $p['aug'],
                    $p['sep'],
                    $p['oct'],
                    $p['nov'],
                    $p['dec'],
                    str_replace("\n\r","",$p['budget_type']),
                    $p['user_id'],
                    'REMOVE'
                );
            }

            $process = $this->dbTable->SPExecute(
                'sp_masterbudgetcoa_upload', 
                $p['project_id'],
                $p['pt_id'],
                $p['coa_id'],
                $department,
                $p['coa'],
                $p['coa_name'],
                $p['year'],
                $p['total'],
                $p['jan'],
                $p['feb'],
                $p['mar'],
                $p['apr'],
                $p['may'],
                $p['jun'],
                $p['jul'],
                $p['aug'],
                $p['sep'],
                $p['oct'],
                $p['nov'],
                $p['dec'],
                str_replace("\n\r","",$p['budget_type']),
                $p['user_id'],
                'ADD'

            );
            

            $lastpt = $p['pt_id'];
            $lastproject = $p['project_id'];
            $lastyear = $p['year'];
            $lastBudgetType = str_replace("\n\r","",$p['budget_type']);

            $cekdata++;

            if ($process[0][0]['result'] == 1 ) {
                $success++;
            } else {
                $failed++;
            }
        }

        $result = array(
            'success' => $success,
            'failed'  => $failed
        );
        return $result;
    }

    public function sel_budgetid($param){
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_budgetcoa_read_sel',
            $param['project_id'],
            $param['pt_id'],
            $param['year'],
            $param['journal_status'],
            $param['coa'],
            $param['description'],
            $param['department_id'],
            $param['budget_type'],
            $param['coa_nl']

        );
        return $hasil;
    }

    public function delete_AllData($user, $budgetdeletedId) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_budgetcoa_delete_all',
            'ALL',
            $user,
            $budgetdeletedId);

        return $hasil;
    }

    public function delete_AllDepartment($user, $param) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_budgetcoa_delete_all',
            'DEPARTMENT',
            $user,
            $param['department_id'],
            $param['project_id'],
            $param['pt_id'],
            $param['coa'],
            $param['description'],
            $param['year'],
            $param['journal_status'],
            $param['budget_type'],
            $param['coa_nl']
        );

        return $hasil;
    }
}

?>
