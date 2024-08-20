<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/apli/ApliController.php';

class Cashier_MasterbudgetcashflowController extends ApliController{
    
    public function allRead() {

        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'budgetcf', array('pt','project'), array("deletedRows")));
        $budgetCF = new Cashier_Models_Master_budgetCF();
        $budgetCF->setProject($session->getProject());
        $budgetCF->setPt($session->getPt());
        $dao = new Cashier_Models_Master_budgetCFDao();
        $dm->setObject(new Cashier_Models_Master_budgetCF());
        $dm->setDao($dao);
        $hasil = $dao->getByProjectPtWithPageSearch($budgetCF,$eremsReq, $session->getUser()->getId());
        $dm->setHasil($hasil);
        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);
        $hasilData = Apli::prosesDao($dm->getDataList());
        
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }
    
    public function detailRead() {

        $params    = $this->getRequest()->getPost();
        $session   = Apli::getSession();
        $request   = Apli::getRequest($params);
        $dao       = new Cashier_Models_Master_budgetCFDao();
        $ptHasil   = $dao->getCustomRead('detailpt',$request,$session);
        $yearHasil = $dao->getCustomRead('detailyear',$request,$session);
        $deptHasil = $dao->getCustomRead('detaildept',$request,$session);
        $ptModel   = Apli::generateExtJSModelDirectWithDetail('pt','project');
        $deptModel = Apli::generateExtJSModelDirect('department');
        $yearModel = Apli::generateExtJSModelDirect('budgetcf');

        
        
        $searchData = $dao->searchdata($request, $session->getProject()->getId(), $session->getPT()->getId());
        
        return array(
            "data"=> array(
                "pt"=>array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
                "department"=>array(
                    "model" => $deptModel,
                    "data" => $deptHasil[0]
                ),
                // "year"=>array(
                //     "model" => $yearModel,
                //     "data" => $yearHasil[0]
                // ),
                "search"=> $searchData,
                "ptid"=>$session->getPt()->getId()
            ),
            
        );
    }
    
    public function mainUpdate(){

        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $budgeetCoa = new Cashier_Models_Master_budgetCF();
        $budgeetCoa->setArrayTable($data);
        $budgeetCoa->setAddBy($session->getUser()->getId());
        $budgeetCoa->setProjectPt($session->getProject(),$session->getPt());
        $validator = new Cashier_Models_Validator_BudgetcfValidator();
        $validator->appRequest = $request;
        $validator->runV2($budgeetCoa);
      
        
        return array(
            "success"=>$validator->getStatus(),
            "msg"=>$validator->getMsg()
        ); 
    }
    
    public function mainDelete(){
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = json_decode($params['data'],true);
        $user = $session->getUser()->getId();
        $deletedId = array();
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach($data as $row=> $index) {
                $deletedId[$row] = $index['budget_id'];
            } 
            $send = implode('~',$deletedId);
        } else {
            $send = $data['budget_id'];
        }
        $dao = new Cashier_Models_Master_budgetCFDao();
        $hasil = $dao->deleteData($user,$send, $request);
        //if($hasil) {
        if(true) {
            $status=TRUE;
        }
        else {
            $status=FALSE;
        }
        return array(
            "success"=>$status,
            "total"=>$hasil  
        );
    }
    
    public function generatecfRead() {
        $params  = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        
        $dao      = new Cashier_Models_Master_budgetCFDao();
        $budgetCF = new Cashier_Models_Master_budgetCF();
        $budgetCF->setProjectPt($session->getProject(),$session->getPt());

        $hasil = $dao->getHasilGenerateCF($budgetCF,$request,$session->getUser()->getId());
        
        return array(
            "data"=>array(
                "HASIL"=>$hasil,
                "MSG"=>""
            )    
        );
    }

    public function exportRead()
    {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = new Cashier_Models_Master_budgetCFDao();
        $hasil = $dao->exportData($params,$session->getUser()->getId());
        $counter = 0;
        $valid = true;
        $message = "";
        $data = $hasil;

        $return = array(
            "parameter" => null,
            "msg" => $message,
            "success" => $valid,
            "data" => $data,
            "total" => $counter,
        );
        return $return;
    }

    public function uploadRead()
    {
        $result = array('data' => array(), 'total' => 0, 'success' => true);
        $session = Apli::getSession();
        $dao = new Cashier_Models_Master_budgetCFDao();
        $post_data['start'] = 0;
        $post_data['limit'] = 10000;
        $tmpName = $_FILES['file-path']['tmp_name'];
        $filename = $_FILES['file-path']['name'];
        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        $arrData =  array();
        $accData =  array();

        if ($ext == 'xlsx' || $ext == 'xls') {
            require_once APPLICATION_PATH . '/modules/cashier/library/phpexcel/PHPExcel.php';
            require_once APPLICATION_PATH . '/modules/cashier/library/phpexcel/PHPExcel/IOFactory.php';

            $inputFileName = $tmpName;

            //  Read your Excel workbook
            try {
                $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
                $objReader = PHPExcel_IOFactory::createReader($inputFileType);
                $objPHPExcel = $objReader->load($inputFileName);
            } catch(Exception $e) {
                die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
            }

            //  Get worksheet dimensions
            $sheet = $objPHPExcel->getSheet(0); 
            $highestRow = $sheet->getHighestRow(); 
            $highestColumn = $sheet->getHighestColumn();


            //  Loop through each row of the worksheet in turn
            $z=0;
            for ($row = 2; $row <= $highestRow; $row++){ 
                //  Read a row of data into an array
                $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row,
                    NULL,
                    TRUE,
                    FALSE);
                //  Insert row data array into your database of choice here
                $acc = array(
                        'project_id'=> trim($rowData[0][1]),
                        'pt_id'=> trim($rowData[0][2]),
                        'coa_id'=> trim($rowData[0][3]),
                        'setupcashflow_id'=> trim($rowData[0][4]),
                        'department_id' => trim($rowData[0][5]),
                        'cashflowtype_id' => trim($rowData[0][6]),
                        'coa' => trim($rowData[0][8]),
                        'year'=> trim($rowData[0][10]),
                        'total' => str_replace(",", "", $rowData[0][11]),
                        'jan' => str_replace(",", "", $rowData[0][12]),
                        'feb' => str_replace(",", "", $rowData[0][13]),
                        'mar' => str_replace(",", "", $rowData[0][14]),
                        'apr' => str_replace(",", "", $rowData[0][15]),
                        'may' => str_replace(",", "", $rowData[0][16]),
                        'jun' => str_replace(",", "", $rowData[0][17]),
                        'jul' => str_replace(",", "", $rowData[0][18]),
                        'aug' => str_replace(",", "", $rowData[0][19]),
                        'sep' => str_replace(",", "", $rowData[0][20]),
                        'oct' => str_replace(",", "", $rowData[0][21]),
                        'nov' => str_replace(",", "", $rowData[0][22]),
                        'dec' => str_replace(",", "", $rowData[0][23]),
                        'budget_type' => trim($rowData[0][24]),
                        'user_id' => $session->getUser()->getId()
                ); 

                array_push($accData, $acc);
            }
        }else{

            $csvAsArray = fopen($tmpName, "r");
            while ($line = fgets($csvAsArray)) {
                $line = str_replace('"',"",$line);
                $line = str_replace("\t",";",$line);
                $arr = explode(';',$line);
                array_push($arrData, $arr);
            }
            
            fclose($csvAsArray); 
            foreach ($arrData as $key => $a) {
                if($key!=0){

                    $acc = array(
                        'project_id'=> trim($a[1]),
                        'pt_id'=> trim($a[2]),
                        'coa_id'=> trim($a[3]),
                        'setupcashflow_id'=> trim($a[4]),
                        'department_id' => trim($a[5]),
                        'cashflowtype_id' => trim($a[6]),
                        'coa' => trim($a[8]),
                        'year'=> trim($a[10]),
                        'total' => str_replace(",", ".", str_replace(".", "", $a[11])),
                        'jan' => str_replace(",", ".", str_replace(".", "", $a[12])),
                        'feb' => str_replace(",", ".", str_replace(".", "", $a[13])),
                        'mar' => str_replace(",", ".", str_replace(".", "", $a[14])),
                        'apr' => str_replace(",", ".", str_replace(".", "", $a[15])),
                        'may' => str_replace(",", ".", str_replace(".", "", $a[16])),
                        'jun' => str_replace(",", ".", str_replace(".", "", $a[17])),
                        'jul' => str_replace(",", ".", str_replace(".", "", $a[18])),
                        'aug' => str_replace(",", ".", str_replace(".", "", $a[19])),
                        'sep' => str_replace(",", ".", str_replace(".", "", $a[20])),
                        'oct' => str_replace(",", ".", str_replace(".", "", $a[21])),
                        'nov' => str_replace(",", ".", str_replace(".", "", $a[22])),
                        'dec' => str_replace(",", ".", str_replace(".", "", $a[23])),
                        'budget_type' => trim($a[24]),
                        'user_id' => $session->getUser()->getId()
                    ); 

                    array_push($accData, $acc);
                    $tmpAcc = $a[0];
                    
                }
            } 
        }

        $result_process = $dao->prosesupload($accData);

        $result = array('data' => array($accData), 'result' => $result_process, 'total' => 0, 'success' => true);
        return $result;
    }

    public function deleteallRead(){
        $params = $this->getRequest()->getPost();
        
        $session = Apli::getSession();
        $user = $session->getUser()->getId();
        $budgetCoa = new Cashier_Models_Master_budgetCFDao();
        $data = $budgetCoa->sel_budgetid($params,$user);
        $deletedId = array();
        $res = 0;
        foreach($data[0] as $row=> $index) {
                $deletedId[$row] = $index['budget_id'];
                $hasil = $budgetCoa->delete_AllData($params,$user,$index['budget_id']);

                if($hasil) {
                    $res = $res;
                }
                else {
                    $res++;
                }
        } 
        
        if($res) {
            $status=TRUE;
        }
        else {
            $status=FALSE;
        }

        return array(
            "success"=>$status,
            "total"=>$res
        );
        
    }

    public function departmentRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = new Cashier_Models_Master_budgetCFDao();
        $deptHasil = $dao->getCustomRead('deptbycashflow',$request,$session);
        $deptModel = Apli::generateExtJSModelDirect('department');
        
        return array(
            "data"=> array(
                "department"=>array(
                    "model" => $deptModel,
                    "data" => $deptHasil[0]
                ),
                "ptid"=>$session->getPt()->getId()
            ),
            
         );
    }

    public function validateRead() {
        $params  = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao     = new Cashier_Models_Master_budgetCFDao();
        
        $hasil = $dao->validateGenerateCF($request,$session->getUser()->getId());        
        return array(
            "data"=> $hasil
        );
    }

    public function searchdataRead() {
        $params  = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao     = new Cashier_Models_Master_budgetCFDao();
        
        $hasil = $dao->searchdata($request,$session->getUser()->getId());        
        return array(
            "data"=> $hasil
        );
    }

    public function changeptRead() {
        $params    = $this->getRequest()->getPost();
        $session   = Apli::getSession();
        $request   = Apli::getRequest($params);
        $dao       = new Cashier_Models_Master_budgetCFDao();
        
        $searchData = $dao->searchdata($request, $request->getOthersValue("project_id"), $request->getOthersValue("pt_id"));
        
        return array(
            "data"=> array(
                "search"=> $searchData
            ),
            
        );
    }

    public function checkbudgetcashflowRead() {
        $params    = $this->getRequest()->getPost();
        $session   = Apli::getSession();
        $request   = Apli::getRequest($params);
        $dao       = new Cashier_Models_Master_budgetCFDao();
        
        $message = $dao->checkBudget($request);
        
        return array(
            "data"=> $message
        );
    }
}

