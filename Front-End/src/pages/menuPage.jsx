import { useState } from 'react';
import './menuPage.css';
import Sidebar from '../../components/ResponsiveAppBar';
import PopupProduct from '../../components/PopUpProduct';

export default function MenuPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showPopupProduct, setShowPopupProduct] = useState(false);
  const [color, setColor] = useState({
    color: 'rgba(117, 42, 116, 1)',
  })


  function handleMouseUp(){
    setColor({
      color: 'rgba(117, 42, 116, 1)',
    })
  }

  function handleMouseDown(){
    setColor({
      color: 'rgba(155, 80, 154, 1)',
    })
  }

  function handleHover(){
    setColor({
      color: 'rgba(155, 80, 154, 0.5)',
    })
  }

  const handleOpenPopupProduct = () => {
    setShowPopupProduct(true);
  }

  const handleClosePopupProduct = () => {
    setShowPopupProduct(false);
  }

  return (
    <div className='d-flex' style={{background: '#faf0d2', position:'initial', flexWrap:'wrap'}}>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div style={{ padding: isSidebarOpen ? '0px 240px 150px 240px' : '0px 0px 150px 40px', position:'initial' }}>
        <div className="wrapper" style={{ background: '#faf0d2', fontFamily: 'Allerta, sans-serif', fontSize: 22, borderTopStyle: 'none' }}>
          <div id="content" style={{ background: '#FAF0D2', borderTopWidth: 0, borderBottomWidth: 2, borderBottomColor: '#7c3271'}}>
            <div style={{ marginTop: 10, marginLeft: 30 }}>
              <h1 style={{ fontSize: 25, fontFamily: 'Allerta, sans-serif' }}>Expendio Bachoco</h1>
              <h1 style={{ fontFamily: 'Allerta, sans-serif', fontSize: 38 }}>EL POLLO MAX</h1>
            </div>
            <div className="d-flex justify-content-between" style={{ marginTop: 50, marginLeft: 50 }}>
              <div className="table-responsive" style={{ background: '#faf0d2' }}>
                <table className="table table-borderless">
                  <thead style={{ background: '#FAF0D2' }}>
                    <tr style={{ background: '#FAF0D2' }}>
                      <th style={{ background: '#faf0d2', fontSize: 25, paddingRight: 50, borderTopWidth: 0, borderBottomWidth: 2, borderBottomColor: '#7c3271', fontFamily: 'Allerta, sans-serif', color:'black' }}>Producto</th>
                      <th style={{ background: '#faf0d2', fontSize: 25, marginRight: 0, paddingRight: 50, borderTopWidth: 0, borderBottomWidth: 2, borderBottomColor: '#7c3271', fontFamily: 'Allerta, sans-serif', color:'black' }}>Cantidad</th>
                      <th style={{ background: '#faf0d2', fontSize: 25, width: 100, paddingRight: 50, borderTopWidth: 0, borderBottomWidth: 2, borderBottomColor: '#7c3271', fontFamily: 'Allerta, sans-serif', color:'black' }}>P.U.</th>
                      <th style={{ background: '#faf0d2', fontSize: 25, marginRight: 0, paddingRight: 50, borderTopWidth: 0, borderBottomWidth: 2, borderBottomColor: '#7c3271', fontFamily: 'Allerta, sans-serif', color:'black' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ background: '#faf0d2', borderBottomWidth: 0, fontFamily: 'Allerta, sans-serif', fontSize: 24, border:'none' }}>Pollo</td>
                      <td style={{ background: '#faf0d2', borderBottomWidth: 0, fontFamily: 'Allerta, sans-serif', fontSize: 24, border:'none' }}>1.809</td>
                      <td style={{ background: '#faf0d2', width: 100, borderBottomWidth: 0, fontFamily: 'Allerta, sans-serif', fontSize: 24, border:'none' }}>$134.00</td>
                      <td style={{ background: '#faf0d2', borderBottomWidth: 0, fontFamily: 'Allerta, sans-serif', fontSize: 24, border:'none' }}>$242.41</td>
                    </tr>
                    <tr>
                      <td style={{ background: '#faf0d2', borderTopColor: '#7c3271', borderLeft:'0px',borderRight:'0px', borderBottom:'0px', borderRadius:'0px'}}></td>
                      <td style={{ background: '#faf0d2', borderTopColor: '#7c3271', borderLeft:'0px',borderRight:'0px', borderBottom:'0px', borderRadius:'0px' }}></td>
                      <td style={{ background: '#faf0d2', fontFamily: 'Allerta, sans-serif', fontSize: 25, borderTopColor: '#7c3271', borderLeft:'0px',borderRight:'0px', borderBottom:'0px', borderRadius:'0px'}}>Total</td>
                      <td style={{ background: '#faf0d2', fontFamily: 'Allerta, sans-serif', fontSize: 25, borderTopColor: '#7c3271', borderLeft:'0px',borderRight:'0px', borderBottom:'0px', borderRadius:'0px'}}>$00.00</td>
                    </tr>
                    <tr>
                      <td style={{ background: '#faf0d2', border:'none' }}></td>
                      <td style={{ background: '#faf0d2', border:'none' }}></td>
                      <td style={{ background: '#faf0d2', fontFamily: 'Allerta, sans-serif', fontSize: 25, border:'none'}}>Redondeo</td>
                      <td style={{ background: '#faf0d2', fontFamily: 'Allerta, sans-serif', fontSize: 25, border:'none'}}>$00.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ marginLeft: 50 }}>
                <label className="form-label" style={{ fontFamily: 'Allerta, sans-serif', fontSize: 25, color: 'var(--bs-emphasis-color)', marginLeft: 20 }}>Buscar:&nbsp;</label>
                <input type="search" style={{ background: '#faf0d2', width: 160, outline:'none', color:'black', padding:'0px 10px' }} />
                <div>
                  <ul className="list-group">
                    <li className="list-group-item d-xl-flex justify-content-xl-center" style={{ background: '#faf0d2', border: 'none', color: 'rgb(255,255,255)' }}>
                      <button onClick={handleOpenPopupProduct} className="btn btn-primary" type="button" style={{ width: 270, height: 60, fontFamily: 'Allerta, sans-serif', fontSize: 24, border: 'none', background: color.color, outline: 'none'}} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onMouseOver={handleHover} onMouseLeave={handleMouseUp}>PRODUCTO 1</button>
                    </li>
                  </ul>
                </div>
                {showPopupProduct && <PopupProduct onClose={handleClosePopupProduct} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

