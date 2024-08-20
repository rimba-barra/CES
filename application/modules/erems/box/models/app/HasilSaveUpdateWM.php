<?php
/**
 * Description of HasilSaveUpdateWM
 *
 * @author MIS
 */
class Erems_Box_Models_App_HasilSaveUpdateWM extends Erems_Box_Kouti_Hasil {
    
    private $success;
    private $msg; /*message*/
    private $others; /*others information*/
    private $successTransaction; 
    
    public function __construct() {
        $this->success = false;
        $this->msg = "Kosong...";
        $this->setForm(array('success'=>false,'success_transaction'=>false,'msg'=>"Kosong...",'others'=>NULL));
    }
    
    public function getSuccess() {
        return $this->success;
    }

    public function setSuccess($success) {
        $this->success = $success;
    }

    public function getMsg() {
        return $this->msg;
    }

    public function setMsg($msg) {
        $this->msg = $msg;
    }
    
    public function getOthers() {
        return $this->others;
    }

    public function setOthers($others) {
        $this->others = $others;
    }
    
    function getSuccessTransaction() {
        return $this->successTransaction;
    }

    function setSuccessTransaction($successTransaction) {
        $this->successTransaction = $successTransaction;
    }

    
    
        
    protected function setFormFromParams() {
         $form = $this->getForm();
        $form['success'] = $this->success;
        $form['msg'] = $this->msg;
        $form['others'] = $this->others;
        $form['success_transaction'] = $this->successTransaction;
        return $form;
    }

    protected function setParamsFromForm() {
        $form = $this->getForm();
        $this->success = $form['success'];
        $this->msg = $form['msg'];
        $this->others = $form['others'];
        $this->successTransaction = $form['success_transaction'];
    }    
}

?>
