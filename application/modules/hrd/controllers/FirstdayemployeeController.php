<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_FirstdayemployeeController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'firstdayemployee', array(), array()));
        $dm->setObject(new Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee());
        $dm->setDao(new Hrd_Models_Firstday_Firstdayemployee_Dao());
        $dm->setValidator(new Hrd_Models_Firstday_Firstdayemployee_Validator());
        $dm->setIdProperty("firstdayform_answer_id");
        return $dm;
    }

    public function getTransactionRead(){
    	$em = new Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Firstday_Firstdayemployee_Dao();
        
        $hasil = $dao->getalltrans($em, $this->getAppSession(), $this->getAppData());
        
        if(array_key_exists(0,$hasil[1])){
            $jsonDecode = json_decode($hasil[1][0]['firstdayform_answer']);
            foreach($jsonDecode as $key => $item){
                $firstdayform_id[] = $item->firstdayform_id;
            }
            $im_firstdayform_id = implode(', ', $firstdayform_id);

            $allquestion = $dao->getallquestion($em, $this->getAppSession(), $this->getAppData(), $im_firstdayform_id);
            $allquestion = $allquestion[1];

            $hasil_json = array();
            $total_row  = 0;
            $i          = 1;
            foreach($allquestion as $key => $item){
                foreach($jsonDecode as $key_child => $item_child){
                    if($item_child->firstdayform_id == $item['firstdayform_id']){
                        $hasil_json[] = array(  
                                                'RowNum'                => $i,
                                                'firstdayform_id'       => $item['firstdayform_id'],
                                                'project_id'            => $item['project_id'],
                                                'pt_id'                 => $item['pt_id'],
                                                'question'              => $item['question'],
                                                'answer'                => $item_child->answer
                                        );
                        $i++;
                        $total_row++;
                    }
                }
            }

            $result[0][0]['totalRow'] = $total_row;
            $result[1] = $hasil_json;
        }else{
            $allquestion = $dao->getallquestion($em, $this->getAppSession(), $this->getAppData(), '');
            $allquestion = $allquestion[1];

            $hasil_json = array();
            $total_row  = 0;
            $i          = 1;
            foreach($allquestion as $key => $item){
                if($item['question_active'] == '1'){
                        $hasil_json[] = array(  
                                                'RowNum'                => $i,
                                                'firstdayform_id'       => $item['firstdayform_id'],
                                                'project_id'            => $item['project_id'],
                                                'pt_id'                 => $item['pt_id'],
                                                'question'              => $item['question'],
                                                'answer'                => ''
                                        );
                        $i++;
                        $total_row++;
                }
            }
            $result[0][0]['totalRow'] = $total_row;
            $result[1] = $hasil_json;
        }

        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'firstdayemployeetransaction', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($result);
        
        return $dm;
    }

    public function updatedetilRead(){
        $data = $this->getAppData();
        $jsonString = json_decode($data['jsonString'], true);
        $key_save = 0;
        $item_save = array();
        foreach($jsonString as $key => $item){
            $json_item = json_decode($item);
            $item_save[$key_save]['firstdayform_id'] = $json_item->firstdayform_id;
            if( $json_item->answer == true){
                 $json_item->answer = 1;
            }else{
                 $json_item->answer = 0;
            }
            $item_save[$key_save]['answer'] = $json_item->answer;
            $key_save++;
        }

        $jsonencode_answer            = json_encode($item_save);
        
        $em = new Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Firstday_Firstdayemployee_Dao();
        
        $check_trans = $dao->getalltrans($em, $this->getAppSession(), $this->getAppData());

        if(array_key_exists(0,$check_trans[1])){
            $hasil = $dao->updateDetail($em, $this->getAppSession(), $this->getAppData(),$jsonencode_answer);
        }else{
            $hasil = $dao->createDetail($em, $this->getAppSession(), $this->getAppData(),$jsonencode_answer);
        }
        
        // if(array_key_exists(0,$hasil[1])){
        //     $jsonDecode = json_decode($hasil[1][0]['firstdayform_answer']);
        //     foreach($jsonDecode as $key => $item){
        //         $firstdayform_id[] = $item->firstdayform_id;
        //     }
        //     $im_firstdayform_id = implode(', ', $firstdayform_id);

        //     $allquestion = $dao->getallquestion($em, $this->getAppSession(), $this->getAppData(), $im_firstdayform_id);
        //     $allquestion = $allquestion[1];

        //     $hasil_json = array();
        //     $total_row  = 0;
        //     $i          = 1;
        //     foreach($allquestion as $key => $item){
        //         foreach($jsonDecode as $key_child => $item_child){
        //             if($item_child->firstdayform_id == $item['firstdayform_id']){
        //                 $hasil_json[] = array(  
        //                                         'RowNum'                => $i,
        //                                         'firstdayform_id'       => $item['firstdayform_id'],
        //                                         'project_id'            => $item['project_id'],
        //                                         'pt_id'                 => $item['pt_id'],
        //                                         'question'              => $item['question'],
        //                                         'answer'                => $item_child->answer
        //                                 );
        //                 $i++;
        //                 $total_row++;
        //             }
        //         }
        //     }

        //     $result[0][0]['totalRow'] = $total_row;
        //     $result[1] = $hasil_json;
        // }else{
        //     $result[0][0]['totalRow'] = '0';
        //     $result[1] = '';
        // }

        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'firstdayemployeetransaction', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function getemployeeRead(){
        $em = new Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Firstday_Firstdayemployee_Dao();
        
        $hasil = $dao->getallemployee_transaction($em, $this->getAppSession(), $this->getAppData());
        
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeeb', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function getquestionRead(){
        $em = new Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Firstday_Firstdayemployee_Dao();
        
        $hasil = $dao->getAllWoPLActive($em, $this->getAppSession(), $this->getAppData());
        
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'firstdayform', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function generatetransactionRead(){
        $em = new Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Firstday_Firstdayemployee_Dao();

        $data = $this->getAppData();
        $temp_emp = explode('~', $data['employee_id']);
        $temp_fdf = explode('~', $data['firstdayform_id']);

        //cek per orang
        foreach($temp_emp as $key_emp => $item_emp){
            if($item_emp){
                $temp_res = '';
                foreach($temp_fdf as $key_fdf => $item_fdf){
                        if($item_fdf){
                            $temp_res[] = array(
                                                'firstdayform_id' => $item_fdf,
                                                'answer'          => 1
                                        );
                        }
                        
                }

                $jsonencode_answer = json_encode($temp_res);
                $data_emp['employee_id'] = $item_emp;

                $check_trans = $dao->getalltrans($em, $this->getAppSession(), $data_emp);

                if(array_key_exists(0,$check_trans[1])){

                    $hasil_emp = $dao->getemptrans($em, $this->getAppSession(), $this->getAppData(), $item_emp);
                    $emp_trans = $hasil_emp[1][0]['firstdayform_answer'];
                    $emp_decode = json_decode($emp_trans);
                    $temp_res = '';

                    foreach($temp_fdf as $key_new => $item_new){
                        if($item_new){
                            //semua yang baru diambil
                            $temp_res[] = array(
                                                    'firstdayform_id' => $item_new,
                                                    'answer'          => 1
                                            );
                        }
                    }

                    //cek yang lama dan baru
                    foreach($emp_decode as $key_old => $item_old){
                        if($item_old->firstdayform_id){
                            $i_check = 0;
                            foreach($temp_fdf as $key_new => $item_new){
                                if($item_old->firstdayform_id == $item_new){
                                    $i_check++;
                                }
                            }
                            //yang lama dan tidak beririsan
                            if($i_check == 0){
                                $temp_res[] = array(
                                                        'firstdayform_id' => $item_old->firstdayform_id,
                                                        'answer'          => $item_old->answer
                                                );
                            }
                        }
                    }
                    $jsonencode_answer = json_encode($temp_res);

                    $hasil = $dao->updateDetail($em, $this->getAppSession(), $data_emp,$jsonencode_answer);
                }else{
                    $hasil = $dao->createDetail($em, $this->getAppSession(), $data_emp,$jsonencode_answer);
                }
                // $hasil = $dao->createDetail($em, $this->getAppSession(), $data_emp,$jsonencode_answer);
            }
        }

        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

    public function generatetransaction_notRead(){
        $em = new Hrd_Models_Firstday_Firstdayemployee_Firstdayemployee();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Firstday_Firstdayemployee_Dao();

        $data = $this->getAppData();
        $temp_emp = explode('~', $data['employee_id']);
        $temp_fdf = explode('~', $data['firstdayform_id']);

        //cek per orang
        foreach($temp_emp as $key_emp => $item_emp){
            if($item_emp){
                $temp_res = '';
                foreach($temp_fdf as $key_fdf => $item_fdf){
                        if($item_fdf){
                            $temp_res[] = array(
                                                'firstdayform_id' => $item_fdf,
                                                'answer'          => 0
                                        );
                        }
                        
                }

                $jsonencode_answer = json_encode($temp_res);
                $data_emp['employee_id'] = $item_emp;

                $check_trans = $dao->getalltrans($em, $this->getAppSession(), $data_emp);

                if(array_key_exists(0,$check_trans[1])){
                    $hasil_emp = $dao->getemptrans($em, $this->getAppSession(), $this->getAppData(), $item_emp);
                    $emp_trans = $hasil_emp[1][0]['firstdayform_answer'];
                    $emp_decode = json_decode($emp_trans);
                    $temp_res = '';

                    foreach($temp_fdf as $key_new => $item_new){
                        if($item_new){
                            //semua yang baru diambil
                            $temp_res[] = array(
                                                    'firstdayform_id' => $item_new,
                                                    'answer'          => 0
                                            );
                        }
                    }

                    //cek yang lama dan baru
                    foreach($emp_decode as $key_old => $item_old){
                        if($item_old->firstdayform_id){
                            $i_check = 0;
                            foreach($temp_fdf as $key_new => $item_new){
                                if($item_old->firstdayform_id == $item_new){
                                    $i_check++;
                                }
                            }
                            //yang lama dan tidak beririsan
                            if($i_check == 0){
                                $temp_res[] = array(
                                                        'firstdayform_id' => $item_old->firstdayform_id,
                                                        'answer'          => $item_old->answer
                                                );
                            }
                        }
                    }

                    $jsonencode_answer = json_encode($temp_res);
                    
                    $hasil = $dao->updateDetail($em, $this->getAppSession(), $data_emp,$jsonencode_answer);
                }else{
                    $hasil = $dao->createDetail($em, $this->getAppSession(), $data_emp,$jsonencode_answer);
                }
                // $hasil = $dao->createDetail($em, $this->getAppSession(), $data_emp,$jsonencode_answer);
            }
        }

        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }
    

}

?>
