import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, ICellRendererParams } from 'ag-grid-community'; 
import { AuthenticationService } from '../../core/auth/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Chart, ChartModule } from 'angular-highcharts';
imports: [AgGridAngular, CommonModule, ChartModule]

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AgGridAngular,CommonModule,ChartModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  chart = new Chart({
  chart: {
    type: 'line'
  },
  title: {
    text: 'Overall Revenue'
  },
  xAxis: {
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
  },
  yAxis: {
    title: {
      text: 'Revenue in $'
    }
  },
  series: [
    {
      type: 'line',
      name: "Beirut",
      data: [1000, 1430, 1200, 4000, 5100, 3200, 1900, 4000, 6700, 4300, 6340, 10000]
    },
    {
      type: 'line',
      name: "Riyadh",
      data: [2000, 3430, 1600, 3050, 4300, 6200, 7430, 6320, 10700, 11300, 9320, 12000]
    }
  ],
  
  credits:{
    enabled:false
  }
});

 piechart = new Chart({
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Category:Revenue in %'
  },
  xAxis: {
    categories: [
      'Mens Clothing', 'Womens Clothing', 'Electronics', 'Jewelery'
    ]
  },
  yAxis: {
    title: {
      text: 'Revenue in %'
    }
  },
  series: [
    {type:'pie',
      data:[
        {
          name:'Mens Clothing',
          y:45.0
        },
          {
          name:'Womens Clothing',
          y:25.0
        },
          {
          name:'Electronics',
          y:20.0
        },
          {
          name:'Jewelery',
          y:10.0
        }
      ]
    }
  ],
  
  credits:{
    enabled:false
  }
});


barGraph = new Chart({
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Top 3 Products'
  },
  xAxis: {
    categories: [
      'Solid Gold Petite Micropave', 'Opna Womens Short Sleeve Moisture', 'Mens Cotton Jacket'
    ]
  },
  yAxis: {
    title: {
      text: ''
    }
  },
  series: [
    {type:'pie',
      data:[
        {
          name:'Solid Gold Petite Micropave',
          y:4000
        },
          {
          name:'Opna Womens Short Sleeve Moisture',
          y:2590
        },
          {
          name:'Mens Cotton Jacket',
          y:6700
        }
      ]
    }
  ],
  
  credits:{
    enabled:false
  }
});
  constructor(private authService:AuthenticationService,private router:Router){}
  stats=[
{icon:'<i class="bi bi-currency-dollar custom-color"></i>',price:'$12,480',title:'total Balance',prcntg:'0.43%'},
{icon:'<i class="bi bi-cart2"></i>',price:'$2,572',title:'total Sales',prcntg:'4.35%'},
{icon:'<i class="bi bi-people-fill"></i>',price:'$582',title:'total Customers',prcntg:'2.59%'},
{icon:'<i class="bi bi-shop"></i>',price:'$389',title:'total Orders',prcntg:'0.95%'},

];
  rowData = [
    { customer: 'assidi', productQuantity: 21, date: '2025-08-01', status: 'pending', confirmed: false },
    { customer: 'assidi', productQuantity: 13, date: '2025-08-02', status: 'shipped', confirmed: true },
    { customer: 'assidi', productQuantity: 54, date: '2025-08-03', status: 'cancelled', confirmed: false },
    { customer: 'assidi', productQuantity: 26, date: '2025-08-01', status: 'pending', confirmed: false },
    { customer: 'assidi', productQuantity: 11, date: '2025-08-02', status: 'shipped', confirmed: true },
    { customer: 'assidi', productQuantity: 58, date: '2025-08-03', status: 'cancelled', confirmed: false },
    { customer: 'assidi', productQuantity: 62, date: '2025-08-01', status: 'pending', confirmed: false },
    { customer: 'assidi', productQuantity: 19, date: '2025-08-02', status: 'shipped', confirmed: true },
    { customer: 'assidi', productQuantity: 50, date: '2025-08-03', status: 'cancelled', confirmed: false },
    { customer: 'assidi', productQuantity: 82, date: '2025-08-01', status: 'pending', confirmed: false },
    { customer: 'assidi', productQuantity: 91, date: '2025-08-02', status: 'shipped', confirmed: true },
    { customer: 'assidi', productQuantity: 85, date: '2025-08-03', status: 'cancelled', confirmed: false },
    { customer: 'assidi', productQuantity: 23, date: '2025-08-01', status: 'pending', confirmed: false },
    { customer: 'assidi', productQuantity: 1, date: '2025-08-02', status: 'shipped', confirmed: true },
    { customer: 'assidi', productQuantity: 45, date: '2025-08-03', status: 'cancelled', confirmed: false },
    { customer: 'assidi', productQuantity: 24, date: '2025-08-01', status: 'pending', confirmed: false },
    { customer: 'assidi', productQuantity: 12, date: '2025-08-02', status: 'shipped', confirmed: true },
    { customer: 'assidi', productQuantity: 51, date: '2025-08-03', status: 'cancelled', confirmed: false }
  ];

  columnDefs: ColDef[] = [
    { field: 'customer', headerName: 'Customer',sortable:true },
    { field: 'productQuantity', headerName: 'Product Quantity',sortable:true },
    { field: 'date', headerName: 'Date',sortable:true },
    {
      field: 'status',sortable:true,
      headerName: 'Status',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['pending', 'cancelled', 'shipped']
      },
      cellRenderer: (params: ICellRendererParams) => {
        const status = params.value;
        let color = '';
        if (status === 'pending') color = 'orange';
        else if (status === 'shipped') color = 'green';
        else if (status === 'cancelled') color = 'red';

        return `<span style="color:${color}; font-weight:bold">${status}</span>`;
      }
    },
    {
      headerName: 'Confirmation',
      field: 'confirmed',sortable:true,
      cellRenderer: (params: ICellRendererParams) => {
        if (params.value) {
          return `<span style="color:green; font-weight:bold">Confirmed</span>`;
        } else {
          return `<button class="btn btn-outline-primary btn-confirm">Confirm Order</button>`;
        }
      }
    }
  ];

  onCellClicked(event: any) {
    if (event.colDef.field === 'confirmed' && !event.data.confirmed && event.event.target.classList.contains('btn-confirm')) {
      event.data.confirmed = true;
      event.api.refreshCells({ force: true });
    }
  }

logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }


}
