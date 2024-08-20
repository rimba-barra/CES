<?php
/**
 * Description of HasilSaveUpdateWM
 *
 * @author MIS
 */
class Gl_Box_Models_App_HasilSaveUpdateWM extends Gl_Box_Kouti_Hasil {
    
    private $success;
    private $msg; /*message*/
    
    public function __construct() {
        $this->success = false;
        $this->msg = "Kosong...";
        $this->setForm(array('success'=>false,'msg'=>"Kosong..."));
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

        
    protected function setFormFromParams() {
         $form = $this->getForm();
        $form['success'] = $this->success;
        $form['msg'] = $this->msg;
        return $form;
    }

    protected function setParamsFromForm() {
        $form = $this->getForm();
        $this->success = $form['success'];
        $this->msg = $form['msg'];
    }    
}

?>
