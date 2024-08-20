<?php

/**
 * Description of Hasil
 *
 * @author MIS
 */
abstract class Box_Kouti_Hasil implements Box_Kouti_InterHasil {
    /* $form 
     * example : array('data' => array(), 'total' => 0, 'success' => false);
     */

    private $form; /* array */

    protected function getForm() {
        return $this->form;
    }

    protected function setForm($form) {
        $this->form = (array) $form;
    }

    //

    public function getTypeHasil() {


        $this->form = (array) $this->setFormFromParams();
        return $this->form;
    }
    
    public function setTypeHasil($array) {
        $this->form = $array;
        $this->setParamsFromForm();
    }

    /* 
     * 
     * setFormFromParams()
     * @PARAM ARRAY $this->form
     * @RETURN ARRAY $this->form
     * set your array value with your property 
    
      TEMPLATE USING THIS FUNCTION 
      $this->form['data'] = $this->getData();
      $this->form['total'] = $this->getTotal();
      $this->form['success'] = $this->getSuccess();
      return $this->form;
     */
    abstract protected function setFormFromParams();
    abstract protected function setParamsFromForm();
}

?>
