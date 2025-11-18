from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from django.http import HttpResponse
import csv
import json
from datetime import datetime
from .models import Merchant
from .serializers import MerchantSerializer


class MerchantViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing merchants.
    Provides CRUD operations with proper error handling.
    """
    
    queryset = Merchant.objects.all()
    serializer_class = MerchantSerializer
    
    def get_queryset(self):
        """
        Optionally filter merchants by status or search term.
        """
        queryset = Merchant.objects.all()
        
        # Filter by status
        status_param = self.request.query_params.get('status', None)
        if status_param:
            queryset = queryset.filter(status=status_param)
        
        # Search functionality
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(email__icontains=search) |
                Q(business_registration_number__icontains=search)
            )
        
        return queryset
    
    def create(self, request, *args, **kwargs):
        """Create a new merchant with error handling."""
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def update(self, request, *args, **kwargs):
        """Update merchant with error handling."""
        try:
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(
                instance,
                data=request.data,
                partial=partial
            )
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def destroy(self, request, *args, **kwargs):
        """Delete merchant with error handling."""
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(
                {'message': 'Merchant deleted successfully'},
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get merchant statistics."""
        total = Merchant.objects.count()
        active = Merchant.objects.filter(status='Active').count()
        pending = Merchant.objects.filter(status='Pending').count()
        suspended = Merchant.objects.filter(status='Suspended').count()
        
        return Response({
            'total': total,
            'active': active,
            'pending': pending,
            'suspended': suspended
        })
    
    @action(detail=False, methods=['get'])
    def export_csv(self, request):
        """Export merchants data as CSV."""
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="merchants_export_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv"'
        
        writer = csv.writer(response)
        writer.writerow(['ID', 'Name', 'Email', 'Phone', 'Business Registration Number', 'Status', 'Created At', 'Updated At'])
        
        merchants = self.get_queryset()
        for merchant in merchants:
            writer.writerow([
                merchant.id,
                merchant.name,
                merchant.email,
                merchant.phone,
                merchant.business_registration_number,
                merchant.status,
                merchant.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                merchant.updated_at.strftime('%Y-%m-%d %H:%M:%S')
            ])
        
        return response
    
    @action(detail=False, methods=['get'])
    def generate_report(self, request):
        """Generate comprehensive merchant report."""
        merchants = self.get_queryset()
        total = merchants.count()
        active = merchants.filter(status='Active').count()
        pending = merchants.filter(status='Pending').count()
        suspended = merchants.filter(status='Suspended').count()
        
        # Calculate percentages
        active_percentage = (active / total * 100) if total > 0 else 0
        pending_percentage = (pending / total * 100) if total > 0 else 0
        suspended_percentage = (suspended / total * 100) if total > 0 else 0
        
        report_data = {
            'report_generated_at': datetime.now().isoformat(),
            'summary': {
                'total_merchants': total,
                'active_merchants': active,
                'pending_merchants': pending,
                'suspended_merchants': suspended,
                'active_percentage': round(active_percentage, 2),
                'pending_percentage': round(pending_percentage, 2),
                'suspended_percentage': round(suspended_percentage, 2)
            },
            'merchants': MerchantSerializer(merchants, many=True).data
        }
        
        response = HttpResponse(content_type='application/json')
        response['Content-Disposition'] = f'attachment; filename="merchant_report_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json"'
        response.write(json.dumps(report_data, indent=2))
        
        return response