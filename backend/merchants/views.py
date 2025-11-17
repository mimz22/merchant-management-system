from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
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