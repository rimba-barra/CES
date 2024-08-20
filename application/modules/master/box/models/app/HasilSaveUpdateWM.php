<?php
/**
 * Description of HasilSaveUpdateWM
 *
 * @author MIS
 */
class Master_Box_Models_App_HasilSaveUpdateWM extends Master_Box_Kouti_Hasil {
    
    private $success;
    private $msg; /*message*/
    private $others; /*others information*/
    
    public function __construct() {
        $this->success = false;
        $this->msg = "Kosong...";
        $this->setForm(array('success'=>false,'msg'=>"Kosong...",'others'=>NULL));
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

    
        
    protected function setFormFromParams() {
         $form = $this->getForm();
        $form['success'] = $this->success;
        $form['msg'] = $this->msg;
        $form['others'] = $this->others;
        return $form;
    }

    protected function setParamsFromForm() {
        $form = $this->getForm();
        $this->success = $form['success'];
        $this->msg = $form['msg'];
        $this->others = $form['others'];
    }    
}

?>
