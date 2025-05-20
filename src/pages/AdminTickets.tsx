
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  LayoutGrid,
  Package,
  ShoppingBag,
  Users,
  Settings,
  BarChart3,
  Home,
  Bell,
  Menu,
  ChevronDown,
  Search,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Clock,
  Filter,
  ImageIcon
} from 'lucide-react';
import Logo from '@/components/Logo';
import AdminMobileNavigation from '@/components/AdminMobileNavigation';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  message: string;
  status: 'Open' | 'Closed' | 'In Progress';
  created: string;
  customer?: {
    name: string;
    email: string;
  };
  response?: string;
  images?: {
    id: string;
    url: string;
  }[];
}

const AdminTickets = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [viewTicketOpen, setViewTicketOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageViewOpen, setImageViewOpen] = useState(false);
  const { toast } = useToast();

  // Load tickets from localStorage on component mount
  useEffect(() => {
    const storedTickets = localStorage.getItem('supportTickets');
    if (storedTickets) {
      const parsedTickets: Ticket[] = JSON.parse(storedTickets);
      
      // Add mock customer details if they don't exist
      const enhancedTickets = parsedTickets.map(ticket => ({
        ...ticket,
        customer: ticket.customer || {
          name: 'John Doe',
          email: 'customer@example.com'
        }
      }));
      
      setTickets(enhancedTickets);
      setFilteredTickets(enhancedTickets);
    } else {
      // If no tickets exist, create some mock data
      const mockTickets: Ticket[] = [
        {
          id: 'TKT-1001',
          subject: 'Order not received',
          category: 'order',
          message: 'I placed an order 2 weeks ago but haven\'t received it yet. Order number: #ORD-2305',
          status: 'Open',
          created: new Date(Date.now() - 86400000 * 2).toISOString(),
          customer: {
            name: 'Rahul Mehta',
            email: 'rahul.m@example.com'
          }
        },
        {
          id: 'TKT-1002',
          subject: 'Wrong item color',
          category: 'product',
          message: 'I received my geometric plant holder today but it\'s blue instead of the green I ordered.',
          status: 'In Progress',
          created: new Date(Date.now() - 86400000 * 1).toISOString(),
          customer: {
            name: 'Sneha Jain',
            email: 'sneha.j@example.com'
          },
          response: 'We apologize for the mix-up. Could you please send us a photo of the item you received?'
        },
        {
          id: 'TKT-1003',
          subject: 'Refund request',
          category: 'returns',
          message: 'I would like to return my desk lamp as it doesn\'t match my decor. It\'s unused and in original packaging.',
          status: 'Closed',
          created: new Date(Date.now() - 86400000 * 5).toISOString(),
          customer: {
            name: 'Kiran Reddy',
            email: 'kiran.r@example.com'
          },
          response: 'Your refund has been processed. Please allow 3-5 business days for the funds to appear in your account.'
        }
      ];
      
      setTickets(mockTickets);
      setFilteredTickets(mockTickets);
      localStorage.setItem('supportTickets', JSON.stringify(mockTickets));
    }
  }, []);

  // Filter tickets when filter or search changes
  useEffect(() => {
    let result = [...tickets];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(ticket => ticket.status.toLowerCase() === statusFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(ticket => 
        ticket.subject.toLowerCase().includes(query) ||
        ticket.message.toLowerCase().includes(query) ||
        ticket.id.toLowerCase().includes(query) ||
        (ticket.customer?.name.toLowerCase().includes(query) || false)
      );
    }
    
    setFilteredTickets(result);
  }, [tickets, statusFilter, searchQuery]);

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setResponseText(ticket.response || '');
    setViewTicketOpen(true);
  };

  const handleUpdateTicketStatus = (status: 'Open' | 'In Progress' | 'Closed') => {
    if (!selectedTicket) return;
    
    // Update the ticket status
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          status,
          response: status !== 'Closed' ? responseText : responseText || 'Ticket closed.'
        } as Ticket; // Explicitly cast as Ticket type to ensure type safety
      }
      return ticket;
    });
    
    // Save to localStorage and update state
    localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
    
    // Show toast and close dialog
    toast({
      title: `Ticket ${status.toLowerCase()}`,
      description: `Ticket #${selectedTicket.id} has been marked as ${status.toLowerCase()}`
    });
    
    setViewTicketOpen(false);
  };

  const handleReplyToTicket = () => {
    if (!selectedTicket || !responseText.trim()) {
      toast({
        title: "Response required",
        description: "Please enter a response before replying",
        variant: "destructive"
      });
      return;
    }
    
    // Update the ticket with response
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          status: 'In Progress' as const, // Use const assertion to ensure the literal type
          response: responseText
        };
      }
      return ticket;
    });
    
    // Save to localStorage and update state
    localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
    
    // Show toast and close dialog
    toast({
      title: "Response sent",
      description: `Reply sent to ticket #${selectedTicket.id}`
    });
    
    setViewTicketOpen(false);
  };

  const handleViewImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageViewOpen(true);
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      'order': 'Order Issue',
      'product': 'Product Inquiry',
      'shipping': 'Shipping & Delivery',
      'returns': 'Returns & Refunds',
      'technical': 'Technical Support',
      'other': 'Other'
    };
    
    return categories[category] || 'Unknown';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-900 text-white">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center">
            <Logo withText={false} />
            <span className="ml-3 text-xl font-semibold">AVIRVA Admin</span>
          </div>
        </div>

        <nav className="flex-grow p-4">
          <p className="text-xs text-gray-400 font-medium mb-3 uppercase">Dashboard</p>
          <Link to="/admin" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <LayoutGrid className="h-5 w-5 mr-3" />
            Overview
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Products</p>
          <Link to="/admin/products" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <Package className="h-5 w-5 mr-3" />
            Products
          </Link>
          <Link to="/admin/categories" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <LayoutGrid className="h-5 w-5 mr-3" />
            Categories
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Orders</p>
          <Link to="/admin/orders" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <ShoppingBag className="h-5 w-5 mr-3" />
            Orders
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Customers</p>
          <Link to="/admin/customers" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <Users className="h-5 w-5 mr-3" />
            Customers
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Support</p>
          <Link to="/admin/tickets" className="flex items-center py-2 px-3 rounded-md bg-gray-800 text-white mb-1">
            <MessageSquare className="h-5 w-5 mr-3" />
            Tickets
          </Link>
          
          <p className="text-xs text-gray-400 font-medium mt-6 mb-3 uppercase">Analytics</p>
          <Link to="/admin/analytics" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white mb-1">
            <BarChart3 className="h-5 w-5 mr-3" />
            Reports
          </Link>
          
          <div className="mt-6">
            <Link to="/admin/settings" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </div>
          
          <div className="mt-auto pt-6">
            <Link to="/" className="flex items-center py-2 px-3 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">
              <Home className="h-5 w-5 mr-3" />
              Go to Website
            </Link>
          </div>
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <AdminMobileNavigation isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Admin header */}
        <header className="bg-white shadow-sm border-b px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden mr-2"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">Support Tickets</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <div className="hidden md:block border-l border-gray-300 h-6 mx-2" />
              <div className="hidden md:flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/45.jpg" 
                  alt="Admin user" 
                  className="h-8 w-8 rounded-full mr-2" 
                />
                <div className="flex items-center">
                  <span className="text-sm text-gray-700 mr-1">Admin User</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Admin content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tickets by ID, subject or customer..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tickets</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="board">Board View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="space-y-4">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ticket ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTickets.length > 0 ? (
                        filteredTickets.map(ticket => (
                          <tr key={ticket.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {ticket.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div>{ticket.customer?.name}</div>
                              <div className="text-xs text-gray-400">{ticket.customer?.email}</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                              {ticket.subject}
                              {ticket.images && ticket.images.length > 0 && (
                                <span className="ml-2 inline-flex items-center">
                                  <ImageIcon size={14} className="text-gray-400" />
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {getCategoryLabel(ticket.category)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={
                                ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                                ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }>
                                {ticket.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(ticket.created)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewTicket(ticket)}
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                            No tickets found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="board">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Open Tickets */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <h3 className="font-medium">Open</h3>
                    <Badge variant="outline">{filteredTickets.filter(t => t.status === 'Open').length}</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredTickets.filter(ticket => ticket.status === 'Open').map(ticket => (
                      <Card 
                        key={ticket.id} 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleViewTicket(ticket)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{ticket.id}</Badge>
                            {ticket.images && ticket.images.length > 0 && (
                              <span className="inline-flex items-center">
                                <ImageIcon size={16} className="text-gray-400" />
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-base">{ticket.subject}</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-sm text-gray-600 line-clamp-2">{ticket.message}</p>
                        </CardContent>
                        <CardFooter className="pt-2 text-xs text-gray-500">
                          <div className="flex justify-between w-full">
                            <span>{ticket.customer?.name}</span>
                            <span>{new Date(ticket.created).toLocaleDateString()}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                    
                    {filteredTickets.filter(t => t.status === 'Open').length === 0 && (
                      <div className="text-center p-6 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
                        <p className="text-gray-500">No open tickets</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* In Progress Tickets */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h3 className="font-medium">In Progress</h3>
                    <Badge variant="outline">{filteredTickets.filter(t => t.status === 'In Progress').length}</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredTickets.filter(ticket => ticket.status === 'In Progress').map(ticket => (
                      <Card 
                        key={ticket.id} 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleViewTicket(ticket)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{ticket.id}</Badge>
                            {ticket.images && ticket.images.length > 0 && (
                              <span className="inline-flex items-center">
                                <ImageIcon size={16} className="text-gray-400" />
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-base">{ticket.subject}</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-sm text-gray-600 line-clamp-2">{ticket.message}</p>
                        </CardContent>
                        <CardFooter className="pt-2 text-xs text-gray-500">
                          <div className="flex justify-between w-full">
                            <span>{ticket.customer?.name}</span>
                            <span>{new Date(ticket.created).toLocaleDateString()}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                    
                    {filteredTickets.filter(t => t.status === 'In Progress').length === 0 && (
                      <div className="text-center p-6 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
                        <p className="text-gray-500">No tickets in progress</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Closed Tickets */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="font-medium">Closed</h3>
                    <Badge variant="outline">{filteredTickets.filter(t => t.status === 'Closed').length}</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredTickets.filter(ticket => ticket.status === 'Closed').map(ticket => (
                      <Card 
                        key={ticket.id} 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleViewTicket(ticket)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{ticket.id}</Badge>
                            {ticket.images && ticket.images.length > 0 && (
                              <span className="inline-flex items-center">
                                <ImageIcon size={16} className="text-gray-400" />
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-base">{ticket.subject}</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-sm text-gray-600 line-clamp-2">{ticket.message}</p>
                        </CardContent>
                        <CardFooter className="pt-2 text-xs text-gray-500">
                          <div className="flex justify-between w-full">
                            <span>{ticket.customer?.name}</span>
                            <span>{new Date(ticket.created).toLocaleDateString()}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                    
                    {filteredTickets.filter(t => t.status === 'Closed').length === 0 && (
                      <div className="text-center p-6 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
                        <p className="text-gray-500">No closed tickets</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      {/* Ticket Detail Dialog */}
      <Dialog open={viewTicketOpen} onOpenChange={setViewTicketOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <div>Ticket {selectedTicket.id}</div>
                  <Badge className={
                    selectedTicket.status === 'Open' ? 'bg-red-100 text-red-800' :
                    selectedTicket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {selectedTicket.status}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Created on {formatDate(selectedTicket.created)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Customer</p>
                    <p className="font-medium">{selectedTicket.customer?.name}</p>
                    <p className="text-sm text-gray-500">{selectedTicket.customer?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Category</p>
                    <p>{getCategoryLabel(selectedTicket.category)}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Subject</p>
                  <p className="font-medium">{selectedTicket.subject}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Message</p>
                  <div className="mt-1 p-4 bg-gray-50 rounded-md">
                    <p className="whitespace-pre-wrap">{selectedTicket.message}</p>
                  </div>
                </div>
                
                {/* Attached Images */}
                {selectedTicket.images && selectedTicket.images.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Attached Images</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedTicket.images.map((image, index) => (
                        <div 
                          key={image.id} 
                          className="w-24 h-24 border rounded-md overflow-hidden cursor-pointer"
                          onClick={() => handleViewImage(image.url)}
                        >
                          <img 
                            src={image.url} 
                            alt={`Attachment ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedTicket.response && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Previous Response</p>
                    <div className="mt-1 p-4 bg-blue-50 rounded-md">
                      <p className="whitespace-pre-wrap">{selectedTicket.response}</p>
                    </div>
                  </div>
                )}
                
                {selectedTicket.status !== 'Closed' && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Your Response</p>
                    <Textarea
                      value={responseText}
                      onChange={e => setResponseText(e.target.value)}
                      placeholder="Type your response here..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                )}
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                {selectedTicket.status !== 'Closed' && (
                  <>
                    <Button 
                      onClick={() => handleReplyToTicket()}
                      className="bg-indigo hover:bg-indigo-600"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Response
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleUpdateTicketStatus('Closed')}
                      className="text-red-500"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Close Ticket
                    </Button>
                  </>
                )}
                
                {selectedTicket.status === 'Closed' && (
                  <Button 
                    onClick={() => handleUpdateTicketStatus('Open')}
                    variant="outline"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Reopen Ticket
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={() => setViewTicketOpen(false)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Image View Dialog */}
      <Dialog open={imageViewOpen} onOpenChange={setImageViewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center">
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Full size preview" 
                className="max-h-[60vh] object-contain"
              />
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setImageViewOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTickets;
