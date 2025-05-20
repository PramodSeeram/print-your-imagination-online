
import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Clock, AlertCircle, MessageCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  responses: {
    id: string;
    message: string;
    fromAdmin: boolean;
    createdAt: string;
  }[];
}

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    category: 'order-issue'
  });
  const [newResponse, setNewResponse] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    // Load tickets from localStorage
    const storedTickets = localStorage.getItem('userTickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    } else {
      // Initialize with empty array if no tickets exist
      localStorage.setItem('userTickets', JSON.stringify([]));
    }
  }, []);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newTicket.subject || !newTicket.message || !newTicket.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create new ticket
    const ticket: Ticket = {
      id: `ticket-${Date.now()}`,
      subject: newTicket.subject,
      message: newTicket.message,
      category: newTicket.category,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: []
    };
    
    const updatedTickets = [...tickets, ticket];
    
    // Save to localStorage
    localStorage.setItem('userTickets', JSON.stringify(updatedTickets));
    
    // Also save to admin tickets
    const adminTickets = localStorage.getItem('adminTickets') 
      ? JSON.parse(localStorage.getItem('adminTickets') || '[]') 
      : [];
    
    localStorage.setItem('adminTickets', JSON.stringify([...adminTickets, ticket]));
    
    // Update state
    setTickets(updatedTickets);
    setShowNewTicketForm(false);
    setNewTicket({
      subject: '',
      message: '',
      category: 'order-issue'
    });
    
    // Show success toast
    toast({
      title: "Ticket submitted",
      description: "Your support ticket has been submitted successfully"
    });
  };

  const handleResponseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newResponse.trim() || !activeTicketId) {
      toast({
        title: "Empty response",
        description: "Please enter your message",
        variant: "destructive"
      });
      return;
    }
    
    // Find the active ticket
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === activeTicketId) {
        return {
          ...ticket,
          responses: [
            ...ticket.responses,
            {
              id: `response-${Date.now()}`,
              message: newResponse,
              fromAdmin: false,
              createdAt: new Date().toISOString()
            }
          ],
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    // Save to localStorage
    localStorage.setItem('userTickets', JSON.stringify(updatedTickets));
    
    // Also update admin tickets
    const adminTickets = localStorage.getItem('adminTickets') 
      ? JSON.parse(localStorage.getItem('adminTickets') || '[]') 
      : [];
    
    const updatedAdminTickets = adminTickets.map((ticket: Ticket) => {
      if (ticket.id === activeTicketId) {
        return {
          ...ticket,
          responses: [
            ...ticket.responses,
            {
              id: `response-${Date.now()}`,
              message: newResponse,
              fromAdmin: false,
              createdAt: new Date().toISOString()
            }
          ],
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    localStorage.setItem('adminTickets', JSON.stringify(updatedAdminTickets));
    
    // Update state
    setTickets(updatedTickets);
    setNewResponse('');
    
    // Show success toast
    toast({
      title: "Response sent",
      description: "Your response has been submitted"
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const activeTicket = activeTicketId ? tickets.find(ticket => ticket.id === activeTicketId) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-avirva">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Support Tickets</h1>
            <Button 
              onClick={() => setShowNewTicketForm(!showNewTicketForm)}
              className="bg-indigo hover:bg-indigo-600"
            >
              {showNewTicketForm ? 'Cancel' : 'New Ticket'}
            </Button>
          </div>
          
          {showNewTicketForm ? (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Submit a New Ticket</h2>
              <form onSubmit={handleTicketSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <Input
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <Select 
                      value={newTicket.category}
                      onValueChange={(value) => setNewTicket({...newTicket, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order-issue">Order Issue</SelectItem>
                        <SelectItem value="product-question">Product Question</SelectItem>
                        <SelectItem value="return-refund">Return/Refund</SelectItem>
                        <SelectItem value="website-issue">Website Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <Textarea
                      value={newTicket.message}
                      onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                      placeholder="Please describe your issue in detail"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-indigo hover:bg-indigo-600"
                    >
                      Submit Ticket
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="font-semibold">Your Tickets</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {tickets.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        <p>You don't have any tickets yet.</p>
                        <p className="text-sm mt-1">Create a new ticket for support.</p>
                      </div>
                    ) : (
                      tickets.map(ticket => (
                        <div 
                          key={ticket.id}
                          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            activeTicketId === ticket.id ? 'bg-gray-50' : ''
                          }`}
                          onClick={() => setActiveTicketId(ticket.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium truncate">{ticket.subject}</h3>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(ticket.createdAt)}
                              </p>
                            </div>
                            <div className="flex items-center">
                              {getStatusIcon(ticket.status)}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {getCategoryLabel(ticket.category)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {ticket.responses.length > 0 ? `${ticket.responses.length} responses` : 'No responses'}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                {activeTicket ? (
                  <div className="bg-white rounded-lg shadow h-full flex flex-col">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <h2 className="font-semibold">{activeTicket.subject}</h2>
                        <div className="flex items-center mt-1 text-sm text-gray-500 space-x-3">
                          <span>{getCategoryLabel(activeTicket.category)}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            {getStatusIcon(activeTicket.status)}
                            <span className="ml-1 capitalize">{activeTicket.status.replace('-', ' ')}</span>
                          </span>
                        </div>
                      </div>
                      {activeTicket.status !== 'closed' && (
                        <Button variant="outline" className="text-sm" size="sm">
                          Close Ticket
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">You</h3>
                          <span className="text-xs text-gray-500">
                            {formatDate(activeTicket.createdAt)}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700 whitespace-pre-wrap">{activeTicket.message}</p>
                      </div>
                      
                      {activeTicket.responses.map(response => (
                        <div 
                          key={response.id}
                          className={`p-4 rounded-lg ${
                            response.fromAdmin ? 'bg-blue-50' : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">
                              {response.fromAdmin ? 'Support Agent' : 'You'}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatDate(response.createdAt)}
                            </span>
                          </div>
                          <p className="mt-2 text-gray-700 whitespace-pre-wrap">{response.message}</p>
                        </div>
                      ))}
                    </div>
                    
                    {activeTicket.status !== 'closed' && (
                      <div className="p-4 border-t border-gray-100">
                        <form onSubmit={handleResponseSubmit} className="flex gap-2">
                          <Textarea 
                            value={newResponse}
                            onChange={(e) => setNewResponse(e.target.value)}
                            placeholder="Type your response..."
                            className="flex-grow min-h-[80px]"
                          />
                          <Button 
                            type="submit" 
                            className="self-end bg-indigo hover:bg-indigo-600"
                          >
                            Send
                          </Button>
                        </form>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center h-full">
                    <MessageCircle className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Ticket Selected</h3>
                    <p className="text-gray-500 text-center">
                      Select a ticket from the list or create a new one to view its details.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tickets;
