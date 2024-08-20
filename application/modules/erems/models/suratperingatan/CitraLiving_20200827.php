<?php

/**
 * Description of Default
 *
 * @author David-MIS
 */
class Erems_Models_Suratperingatan_CitraLiving {
    
    public function getListTagihanHTML_old($params){
        $schedule = $params["schedule"][0];
        $total = 0.0;
        $ttldenda_terlambatb=0;
        $ttlremaining_balance=0;
        $table = "";
		$no=1;
		
        foreach($schedule as $row){
            if($row['indicatorname'] == 'denda'){
                $denda = $row["remaining_denda"];
            }else{
                $denda = $row["denda_terlambatb"];
            }
			
            $ttldenda_terlambatb=$ttldenda_terlambatb+$denda;
            $ttlremaining_balance=$ttlremaining_balance+$row["remaining_balance"];
            $table .='<tr>
						
                        <td>'.$row["scheduletype"].'</td>
                        <td>'.$row["termin"].'</td>
                        <td>'.date('d-m-Y',strtotime($row["duedate"])).'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]).'</td>
                        <!--<td>'.$row["hari_terlambatb"].'</td><td>'.$row["sp_no"].'</td>--> 
                        <td align="right">Rp. '.number_format($denda).'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]+$denda).'</td>
                    </tr>';
					$no++;
        }

        $table .='<tr><td>&nbsp</td><td>&nbsp</td><td>Total </td><td align="right">Rp. '.number_format($ttlremaining_balance).'</td>
                <!--<td></td><td></td>--> <td align="right">Rp. '.number_format($ttldenda_terlambatb).'</td><td align="right">Rp. '.number_format($ttlremaining_balance+$ttldenda_terlambatb).'</td></tr>';

        return $table;
    }
    
	public function getListTagihanHTML($params){
        $schedule = $params["schedule"][0];
        $total = 0.0;
        $ttldenda_terlambatb=0;
        $ttlremaining_balance=0;
        $table = "";
		$no=1;
		
        foreach($schedule as $row){
            if($row['indicatorname'] == 'denda'){
                $denda = $row["remaining_denda"];
            }else{
                $denda = $row["denda_terlambatb"];
            }
			
            $ttldenda_terlambatb=$ttldenda_terlambatb+$denda;
            $ttlremaining_balance=$ttlremaining_balance+$row["remaining_balance"];
            $table .='<tr>
						
                        <td>'.$row["scheduletype"].'</td>
                        <td>'.$row["termin"].'</td>
                        <td>'.date('d-m-Y',strtotime($row["duedate"])).'</td>
                        <td align="right">'.number_format($row["remaining_balance"]).'</td>
                        <!--<td>'.$row["hari_terlambatb"].'</td><td>'.$row["sp_no"].'</td>--> 
                        <td align="right"> '.number_format($denda).'</td>
                        <td align="right">'.number_format($row["remaining_balance"]+$denda).'</td>
                    </tr>';
					$no++;
        }

        $table .='<tr><td>&nbsp</td><td>&nbsp</td><td>Total </td><td align="right">'.number_format($ttlremaining_balance).'</td>
                <!--<td></td><td></td>--> <td align="right">'.number_format($ttldenda_terlambatb).'</td><td align="right">'.number_format($ttlremaining_balance+$ttldenda_terlambatb).'</td></tr>';

        return $table;
    }
	
    public function getHTMLdefault(){
       return $this->getHTML();
    }

    public function getHTML($spke=null){
        $word = "";
        if($data['is_printpreview'] == 1){
            $namafile = trim($data['cluster'].'_'.$data['unit_number']).'_'.date('d-m-Y'); 
            $word = "
                <script>
                    function Export2Doc(element, filename = ''){
                        var preHtml = \"<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>\";
                        var postHtml = \"</body></html>\";
                        var html = preHtml+document.getElementById(element).innerHTML+postHtml;
                        var blob = new Blob(['\ufeff', html], {
                            type: 'application/msword'
                        });
                        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
                        filename = filename?filename+'.doc':'document.doc';
                        var downloadLink = document.createElement('a');
                        document.body.appendChild(downloadLink);
                        if(navigator.msSaveOrOpenBlob ){
                            navigator.msSaveOrOpenBlob(blob, filename);
                        }else{
                            downloadLink.href = url;
                            downloadLink.download = filename;
                            downloadLink.click();
                        }                        
                        document.body.removeChild(downloadLink);
                    }
                </script>
                <button onclick=\"Export2Doc('exportContent', '$namafile');\">Export as .doc</button>";
        }
	if($data['total_schedule'] > 4){
			$page_break = "<div style='page-break-before:always;'><br/><br/><br/><br/><br/><br/><br/><br/></div>";
			// $page_break = "";
		}else{
			$page_break = "";
		}
        $tpl1=
        '<style>
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
                <!--<p class="spstyle_p" align="right">Jakarta, <b>{{tanggal_print_w}}</b></p>-->
                <!--<br/>
                <br/>
                <br/>
                <br/>
                <br/>-->
                <p class="spstyle_p">Jakarta, <b>{{tanggal_print_w}}</b><br/>
					No. Ref : <b>{{max_sp_no}}</b><br/>
                    Hal : Pemberitahuan ke <b>{{max_sp}}</b></p>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p>

                <br>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">';
            
            $tpl2 = 
                '<p style="text-align: justify;font-family: Arial Narrow;font-size: 11pt; font-style: normal;">Menindaklanjuti Surat Pemberitahuan {{sp_ke_before}} No. {{sp_no_before}} tanggal {{sp_date_before}} . </p>';

            $tpl3 = 
                '<p style="text-align: justify;font-family: Arial Narrow;font-size: 11pt; font-style: normal;">Melalui surat ini kami informasikan kepada Bapak/Ibu selaku pembeli Apartemen Citra Living <b> {{unit_number}} </b> Tower {{cluster}}, bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>{{tanggal_print_w}}</b> belum melaksanakan pembayaran atas denda dan angsuran yang telah jatuh tempo, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah) :
                </p>
				</div>
                <br/>

                <table>
					<tbody>
						<tr style="background-color: #e8e9ea;font-weight: bold;">
							<td>Tagihan</td>
							<td>Termin</td>
							<td>Tanggal Jatuh Tempo</td><td>Nilai Tagihan (Rp)</td>
							<!--<td>Keterlambatan (hari) </td><td>Nomor SP - Tanggal SP</td>-->
							<td>Denda Keterlambatan (Rp)<br>( s/d {{max_date}} )*</td>
							<td>Total Dibayar (Rp)<br>( s/d {{max_date}} )*</td>
						</tr> 
                {{{list_tagihan}}}
                </tbody></table>
                <br/>
                <div class="amiddle">
				'.$page_break.'
                <p style="text-align: justify;font-family: Arial Narrow;font-size: 11pt; font-style: normal;">Denda keterlambatan diatas akan berubah sampai dengan pembayaran dan dihitung sejak tgl. terhutang.<br/>

                <p style="text-align: justify;font-family: Arial Narrow;font-size: 11pt; font-style: normal;">Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:<br/>
                <table style="border:none;" width=100%>
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">a.</td>
                        <td align="justify" style="border:none;">
                            Transfer ke :  CITRA MITRA GRAHA KSO  a/c. 5445.909090 BCA Cab.Citra Garden 2 Ext kalideres, Jakarta  Barat. Mohon  mencantumkan Tower,  Lantai, No. Apartemen, dan nama pemesan pada  kolom  berita  di slip transfer ( bukti transfer mohon difax ke 6198213 Up. Devi/Hendriyana dan segera  ditukar  dengan  kwitansi  CitraGarden City) , atau
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">b.</td>
                        <td align="justify" style="border:none;">
                            Membayar langsung ke kasir  penerimaan  City Management Office, Citra 2 Ext. Blok BG. 2A No. 01, CitraGarden City, Jakarta Barat  dengan  cash, giro / cek jatuh tempo atau debit BCA.
                        </td>

                    </tr>
                </table>
                <br/>
                <p style="text-align: justify;font-family: Arial Narrow;font-size: 11pt; font-style: normal;">Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran diatas. Untuk tindak lanjut penyelesaian dapat menghubungi petugas collection kami, sdri. <b>Devi/Hendriyana</b> di no. telp. <b>6198177 ext. 740.</b>
                 <br/><br/></p>

                 ';

            $tpl6 = ', kami tegaskan kepada Bapak/Ibu selaku pembeli unit apartemen <b>{{unit_number}}</b> kawasan {{cluster}}, bahwa pemesanan unit apartemen tersebut menjadi batal.
                    <br/>
                    Keseluruhan uang yang telah Bapak/Ibu bayarkan  tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali unit apartemen tersebut kepada pihak lain. 
                     
                    <br/>
                    Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.

                <br/><br/> ';    

            $tpl4 =  '
                <p style="text-align: justify;font-family: Arial Narrow;font-size: 11pt; font-style: normal;">Apabila lewat dari tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu <b>membatalkan pemesanan apartement </b> tersebut. Keseluruhan uang yang telah Bapak/Ibu bayarkan <b>tidak dapat dikembalikan.</b> Dengan demikian kami <b>berhak menjual kembali apartement </b> tersebut kepada pihak lain.
                 <br/><br/></p>';

            $tpl5 .= ''.$page_break.' Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu  kami ucapkan terima kasih.
                </div>
                <br/><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
                <b>CITRA MITRA GRAHA KSO</b>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <b>SINTHIA ADRYANTO</b><br/>
                Manager Keuangan
                </p>

                <p class="spstyle_p_small"><u>*Note : Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</u></p>
                </body>
                ';
        if($spke==1){
            $tpl = $tpl1.$tpl3.$tpl5;
        }
        elseif($spke==2){
            $tpl = $tpl1.$tpl2.$tpl3.$tpl5;
        }
        elseif($spke==3){
            $tpl = $tpl1.$tpl2.$tpl3.$tpl4.$tpl5;
        }
        elseif($spke==4){
            $tpl = $tpl1.$tpl2.$tpl6.$tpl5;
        }else{
            $tpl = $tpl1.$tpl3.$tpl5;
        }
        
        return $word.'<div id="exportContent">'.$tpl.'</div>';
    }
    
}
