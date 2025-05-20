
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutGrid, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  BarChart3, 
  Home,
  Menu,
  Bell,
  ChevronDown,
  Search,
  Filter,
  Check,
  Clock,
  AlertCircle,
  Ticket,
  MessageSquare,
  BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/Logo';
import AdminMobileNavigation from '@/components/AdminMobileNavigation';
import { useToast } from "@/hooks/use-toast";

// Types for tickets
interface TicketResponse {
  id: string;
  message: string;
  fromAdmin: boolean;
  createdAt: string;
}

interface Ticket {
  id: string;
  subject: string;
  message: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
}

const AdminTickets = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");
  const [ticketMetrics, setTicketMetrics] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
    avgResponseTime: '2.5 hours'
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load tickets from localStorage
    const storedTickets = localStorage.getItem('adminTickets');
    const ticketsData = storedTickets ? JSON.parse(storedTickets) : [];
    setTickets(ticketsData);
    
    // Calculate metrics
    const metrics = {
      total: ticketsData.length,
      open: ticketsData.filter((t: Ticket) => t.status === 'open').length,
      inProgress: ticketsData.filter((t: Ticket) => t.status === 'in-progress').length,
      resolved: ticketsData.filter((t: Ticket) => t.status === 'resolved').length,
      closed: ticketsData.filter((t: Ticket) => t.status === 'closed').length,
      avgResponseTime: '2.5 hours' // This would be calculated in a real app
    };
    
    setTicketMetrics(metrics);
  }, []);

  useEffect(() => {
    // Filter tickets based on search term and status
    let filtered = [...tickets];
    
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(ticket => 
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== "all") {
      filtered = filtered.filter(ticket => ticket.status === filterStatus);
    }
    
    // Sort by date, newest first
    filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    setFilteredTickets(filtered);
  }, [tickets, searchTerm, filterStatus]);

  const handleStatusChange = (ticketId: string, newStatus: 'open' | 'in-progress' | 'resolved' | 'closed') => {
    // Update ticket status
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    // Save to localStorage
    localStorage.setItem('adminTickets', JSON.stringify(updatedTickets));
    
    // Also update user tickets
    const userTickets = localStorage.getItem('userTickets') 
      ? JSON.parse(localStorage.getItem('userTickets') || '[]') 
      : [];
    
    const updatedUserTickets = userTickets.map((ticket: Ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    localStorage.setItem('userTickets', JSON.stringify(updatedUserTickets));
    
    // Update state
    setTickets(updatedTickets);
    
    // Show success toast
    toast({
      title: "Status updated",
      description: `Ticket status changed to ${newStatus.replace('-', ' ')}`
    });
  };

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!responseText.trim() || !selectedTicketId) {
      toast({
        title: "Empty response",
        description: "Please enter your message",
        variant: "destructive"
      });
      return;
    }
    
    // Find the selected ticket
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicketId) {
        // If ticket is open, change to in-progress
        const newStatus = ticket.status === 'open' ? 'in-progress' : ticket.status;
        return {
          ...ticket,
          status: newStatus,
          responses: [
            ...ticket.responses,
            {
              id: `response-${Date.now()}`,
              message: responseText,
              fromAdmin: true,
              createdAt: new Date().toISOString()
            }
          ],
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    // Save to localStorage
    localStorage.setItem('adminTickets', JSON.stringify(updatedTickets));
    
    // Also update user tickets
    const userTickets = localStorage.getItem('userTickets') 
      ? JSON.parse(localStorage.getItem('userTickets') || '[]') 
      : [];
    
    const updatedUserTickets = userTickets.map((ticket: Ticket) => {
      if (ticket.id === selectedTicketId) {
        const newStatus = ticket.status === 'open' ? 'in-progress' : ticket.status;
        return {
          ...ticket,
          status: newStatus,
          responses: [
            ...ticket.responses,
            {
              id: `response-${Date.now()}`,
              message: responseText,
              fromAdmin: true,
              createdAt: new Date().toISOString()
            }
          ],
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    localStorage.setItem('userTickets', JSON.stringify(updatedUserTickets));
    
    // Update state
    setTickets(updatedTickets);
    setResponseText('');
    
    // Show success toast
    toast({
      title: "Response sent",
      description: "Your response has been sent to the customer"
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'resolved':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <Check className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'order-issue':
        return 'Order Issue';
      case 'product-question':
        return 'Product Question';
      case 'return-refund':
        return 'Return/Refund';
      case 'website-issue':
        return 'Website Issue';
      case 'other':
        return 'Other';
      default:
        return category;
    }
  };

  const selectedTicket = selectedTicketId ? tickets.find(ticket => ticket.id === selectedTicketId) : null;

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
            <Ticket className="h-5 w-5 mr-3" />
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  toast({
                    title: "Logged out",
                    description: "You have been logged out successfully"
                  });
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Tickets content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Tabs defaultValue="tickets">
            <TabsList className="mb-6">
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tickets">
              {/* Action bar */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search tickets..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => {
                        // Reset filters
                        setFilterStatus("all");
                        setSearchTerm("");
                      }}
                    >
                      <Filter className="h-4 w-4" />
                      Reset Filters
                    </Button>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tickets</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tickets list */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="font-semibold">
                      {filteredTickets.length} {filteredTickets.length === 1 ? 'Ticket' : 'Tickets'}
                    </h2>
                  </div>
                  
                  <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
                    {filteredTickets.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <p>No tickets found.</p>
                        <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                      </div>
                    ) : (
                      filteredTickets.map(ticket => (
                        <div 
                          key={ticket.id}
                          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedTicketId === ticket.id ? 'bg-gray-50' : ''
                          }`}
                          onClick={() => setSelectedTicketId(ticket.id)}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium truncate">{ticket.subject}</h3>
                            <div className="flex items-center">
                              {getStatusIcon(ticket.status)}
                            </div>
                          </div>
                          
                          <p className="text-gray-500 text-sm truncate mt-1">{ticket.message}</p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {getCategoryLabel(ticket.category)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatDate(ticket.updatedAt)}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                {/* Selected ticket */}
                <div className="lg:col-span-2">
                  {selectedTicket ? (
                    <div className="bg-white rounded-lg shadow h-full flex flex-col">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="font-semibold">{selectedTicket.subject}</h2>
                            <div className="flex items-center mt-1 text-sm text-gray-500 space-x-2">
                              <span>ID: {selectedTicket.id}</span>
                              <span>•</span>
                              <span>{getCategoryLabel(selectedTicket.category)}</span>
                              <span>•</span>
                              <span>{formatDate(selectedTicket.createdAt)}</span>
                            </div>
                          </div>
                          
                          <div>
                            <Select 
                              value={selectedTicket.status}
                              onValueChange={(value) => handleStatusChange(
                                selectedTicket.id, 
                                value as 'open' | 'in-progress' | 'resolved' | 'closed'
                              )}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-grow overflow-y-auto p-4 space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">Customer</h3>
                            <span className="text-xs text-gray-500">
                              {formatDate(selectedTicket.createdAt)}
                            </span>
                          </div>
                          <p className="mt-2 text-gray-700 whitespace-pre-wrap">{selectedTicket.message}</p>
                        </div>
                        
                        {selectedTicket.responses.map(response => (
                          <div 
                            key={response.id}
                            className={`p-4 rounded-lg ${
                              response.fromAdmin ? 'bg-blue-50' : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">
                                {response.fromAdmin ? 'Support Agent' : 'Customer'}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {formatDate(response.createdAt)}
                              </span>
                            </div>
                            <p className="mt-2 text-gray-700 whitespace-pre-wrap">{response.message}</p>
                          </div>
                        ))}
                      </div>
                      
                      {selectedTicket.status !== 'closed' && (
                        <div className="p-4 border-t border-gray-100">
                          <form onSubmit={handleSendResponse}>
                            <Textarea 
                              value={responseText}
                              onChange={(e) => setResponseText(e.target.value)}
                              placeholder="Type your response..."
                              className="min-h-[120px] mb-3"
                            />
                            <div className="flex justify-end space-x-2">
                              <Button 
                                type="submit" 
                                className="bg-indigo hover:bg-indigo-600"
                              >
                                Send Response
                              </Button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center h-full">
                      <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Ticket Selected</h3>
                      <p className="text-gray-500 text-center">
                        Select a ticket from the list to view its details and respond to the customer.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              {/* Ticket Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Tickets</p>
                      <h3 className="text-2xl font-bold mt-1">{ticketMetrics.total}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-indigo/20 flex items-center justify-center">
                      <Ticket className="h-6 w-6 text-indigo" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Open Tickets</p>
                      <h3 className="text-2xl font-bold mt-1">{ticketMetrics.open}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">In Progress</p>
                      <h3 className="text-2xl font-bold mt-1">{ticketMetrics.inProgress}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Response Time</p>
                      <h3 className="text-2xl font-bold mt-1">{ticketMetrics.avgResponseTime}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Status Breakdown */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-6">Tickets by Status</h3>
                  <div className="flex items-center space-x-8">
                    <div className="flex-1">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Open</span>
                            <span>{ticketMetrics.open} ({
                              ticketMetrics.total > 0 
                                ? Math.round((ticketMetrics.open / ticketMetrics.total) * 100)
                                : 0
                            }%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${
                                ticketMetrics.total > 0 
                                  ? (ticketMetrics.open / ticketMetrics.total) * 100
                                  : 0
                              }%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">In Progress</span>
                            <span>{ticketMetrics.inProgress} ({
                              ticketMetrics.total > 0 
                                ? Math.round((ticketMetrics.inProgress / ticketMetrics.total) * 100)
                                : 0
                            }%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full" 
                              style={{ width: `${
                                ticketMetrics.total > 0 
                                  ? (ticketMetrics.inProgress / ticketMetrics.total) * 100
                                  : 0
                              }%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Resolved</span>
                            <span>{ticketMetrics.resolved} ({
                              ticketMetrics.total > 0 
                                ? Math.round((ticketMetrics.resolved / ticketMetrics.total) * 100)
                                : 0
                            }%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${
                                ticketMetrics.total > 0 
                                  ? (ticketMetrics.resolved / ticketMetrics.total) * 100
                                  : 0
                              }%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Closed</span>
                            <span>{ticketMetrics.closed} ({
                              ticketMetrics.total > 0 
                                ? Math.round((ticketMetrics.closed / ticketMetrics.total) * 100)
                                : 0
                            }%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gray-500 h-2 rounded-full" 
                              style={{ width: `${
                                ticketMetrics.total > 0 
                                  ? (ticketMetrics.closed / ticketMetrics.total) * 100
                                  : 0
                              }%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden md:block relative w-40 h-40">
                      {/* This would be a real chart in a production app */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BarChart className="h-24 w-24 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {tickets.slice(0, 5).map(ticket => (
                      <div 
                        key={ticket.id}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedTicketId(ticket.id);
                          document.querySelector('[data-value="tickets"]')?.dispatchEvent(
                            new MouseEvent('click', { bubbles: true })
                          );
                        }}
                      >
                        <div className="mt-1">
                          {getStatusIcon(ticket.status)}
                        </div>
                        <div>
                          <p className="font-medium line-clamp-1">{ticket.subject}</p>
                          <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{ticket.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(ticket.updatedAt)}</p>
                        </div>
                      </div>
                    ))}
                    
                    {tickets.length === 0 && (
                      <div className="text-center text-gray-500 py-4">
                        <p>No recent activity</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminTickets;
