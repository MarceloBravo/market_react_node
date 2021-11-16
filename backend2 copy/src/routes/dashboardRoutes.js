const DashboardModel = require('../models/dashboard');
const checkToken = require('../shared/middlewares/mw_checkToken')

module.exports = function(app, passport){
    app.get('/dashboard/mes', checkToken, (req, res)=>{
        DashboardModel.totalVentasMes((err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.get('/dashboard/trimestre', checkToken, (req, res)=>{
        DashboardModel.totalVentasTrimestre((err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.get('/dashboard/anio', checkToken, (req, res)=>{
        DashboardModel.totalVentasAnio((err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.get('/dashboard/mas_vendidos', checkToken, (req, res)=>{
        DashboardModel.masVendidos((err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.get('/dashboard/menos_vendidos', checkToken, (req, res)=>{
        DashboardModel.menosVendidos((err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.get('/dashboard/total_pedidos_despachos', checkToken, (req, res)=>{
        DashboardModel.totalPedidosDespachos((err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.get('/dashboard/ventas_despachos_ultimo_anio', checkToken, (req, res)=>{
        DashboardModel.ventasDespachosUltimoAnio((err, data)=>{
            res.json(err ? err : data)
        })
    })
}
