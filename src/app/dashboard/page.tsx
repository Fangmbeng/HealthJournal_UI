'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight, X, Video } from "lucide-react";
import Navbar from '../../components/ui/navbar';
import Footer from '../../components/ui/footer';
import { useRouter } from 'next/navigation';

// Add a Button component - in Next.js projects this would typically be in your component library
const Button = ({ 
  children, 
  className = "", 
  variant = "default", 
  onClick,
  disabled
}: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: "default" | "outline"; 
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors";
  const variantClasses = 
    variant === "outline" 
      ? "border border-gray-300 text-gray-700 hover:bg-gray-50" 
      : "bg-blue-600 text-white hover:bg-blue-700";
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default function UICards() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-white via-blue-50 to-purple-100 text-gray-900 overflow-hidden">  
    <Navbar />    
      <section className="relative flex flex-col justify-center items-center text-center p-6 pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-transparent bg-clip-text"
        >
          HealthJournal AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 max-w-xl text-lg md:text-xl text-gray-700"
        >
          Your personal AI health monitoring and medication management.
        </motion.p>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CalendarCard />
        <MethylationCard />
        <DoctorScheduleCard />
      </div>
        <div className="mt-24">
          <Footer />
        </div>
    </div>
  );
}

// Health Calendar Card Component
function CalendarCard() {
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(3); // April (0-indexed)
  const [selectedDay, setSelectedDay] = useState<{
    day: number;
    dateString: string;
    status: string | null;
  } | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Sample health data - in a real app, this would come from an API/database
  const healthData: Record<string, string> = {
    "2025-04-01": "good",
    "2025-04-02": "average",
    "2025-04-03": "good",
    "2025-04-05": "bad",
    "2025-04-07": "average",
    "2025-04-10": "good",
    "2025-04-12": "good",
    "2025-04-15": "average",
    "2025-04-18": "bad",
    "2025-04-20": "good",
    "2025-04-22": "average",
    "2025-04-25": "good",
    "2025-04-28": "good"
  };
  
  // Month names for display
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
  
  // Get days in month and first day of month
  const getDaysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number): number => new Date(year, month, 1).getDay();
  
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  // Navigate months
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Handle day selection
  const handleDayClick = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDay({ day, dateString, status: healthData[dateString] || null });
    setShowDetails(true);
  };
  
  // Generate calendar days
  const renderCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const status = healthData[dateString];
      
      let statusColor = "bg-transparent";
      if (status === "good") statusColor = "bg-green-500/20 border-2 border-green-500";
      else if (status === "average") statusColor = "bg-yellow-500/20 border-2 border-yellow-500";
      else if (status === "bad") statusColor = "bg-red-500/20 border-2 border-red-500";
      
      days.push(
        <motion.div 
          key={day}
          whileHover={{ scale: 1.15 }}
          onClick={() => handleDayClick(day)}
          className="relative h-8 w-8 rounded-full flex items-center justify-center cursor-pointer"
        >
          {status && (
            <div className={`absolute inset-0 ${statusColor} rounded-full`}></div>
          )}
          <span className="relative z-10 text-sm">{day}</span>
        </motion.div>
      );
    }
    
    return days;
  };
  
  const router = useRouter();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl p-6 shadow-xl relative overflow-hidden"
    >
      <div className="flex items-center mb-4">
        <Calendar className="text-blue-600 mr-3 h-6 w-6" />
        <h3 className="text-xl font-semibold">Health Calendar</h3>
      </div>
      
      {/* Year selector */}
      <div className="flex justify-center space-x-4 mb-4">
        {[2024, 2025, 2026].map(year => (
          <button 
            key={year}
            onClick={() => setCurrentYear(year)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              currentYear === year 
                ? "bg-blue-600 text-white" 
                : "text-gray-500 hover:bg-blue-100"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
      
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h4 className="font-medium">{monthNames[currentMonth]} {currentYear}</h4>
        <button 
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div key={i} className="h-8 flex items-center justify-center text-xs text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {renderCalendarDays()}
      </div>
      
      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
          <span>Good</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
          <span>Average</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
          <span>Bad</span>
        </div>
      </div>
      
      <Button onClick={() => router.push('/404')} className="w-full mt-4">
        View Full History
      </Button>
      
      {/* Day Details Panel */}
      {selectedDay && (
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: showDetails ? 0 : "100%" }}
          transition={{ type: "spring", damping: 30 }}
          className="absolute inset-0 bg-white p-6 z-20"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {monthNames[currentMonth]} {selectedDay.day}, {currentYear}
            </h3>
            <button 
              onClick={() => setShowDetails(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          {/* Health Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700">
              Today you reported feeling {selectedDay.status || "normal"}. Your medication schedule was followed correctly and you mentioned improved sleep quality.
            </p>
          </div>
          
          {/* Chat History */}
          <div className="mb-4 space-y-3 h-48 overflow-y-auto">
            <div className="bg-blue-50 p-3 rounded-xl max-w-4/5 ml-auto">
              <p className="text-sm">I'm feeling much better today. I slept well last night.</p>
              <p className="text-xs text-gray-500 text-right mt-1">9:02 AM</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl max-w-4/5">
              <p className="text-sm">That's excellent news! Did you take your morning medication?</p>
              <p className="text-xs text-gray-500 mt-1">9:03 AM</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl max-w-4/5 ml-auto">
              <p className="text-sm">Yes, I took all my medications as scheduled.</p>
              <p className="text-xs text-gray-500 text-right mt-1">9:05 AM</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-xl max-w-4/5">
              <p className="text-sm">Great job! Any side effects or concerns you'd like to report?</p>
              <p className="text-xs text-gray-500 mt-1">9:06 AM</p>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center mt-4">
            <div className={`h-4 w-4 rounded-full mr-2 ${
              selectedDay.status === "good" ? "bg-green-500" :
              selectedDay.status === "average" ? "bg-yellow-500" :
              selectedDay.status === "bad" ? "bg-red-500" : "bg-gray-300"
            }`}></div>
            <span className="text-sm text-gray-600">
              {selectedDay.status ? `${selectedDay.status.charAt(0).toUpperCase() + selectedDay.status.slice(1)} day overall` : "No data recorded"}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Methylation Test Results Card Component
function MethylationCard() {
  const [hovering, setHovering] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-3xl p-6 shadow-xl"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex items-center mb-4">
        <CheckCircle className="text-blue-600 mr-3 h-6 w-6" />
        <h3 className="text-xl font-semibold">DNA Methylation</h3>
      </div>
      
      <div className="text-center py-4">
        <p className="text-lg text-gray-700 mb-3">Test Results Processing</p>
        
        <motion.div 
          className="h-2 bg-gray-200 rounded-full overflow-hidden mb-6"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            initial={{ width: "60%" }}
            animate={{ 
              width: hovering ? "75%" : "70%"
            }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          ></motion.div>
        </motion.div>
        
        <div className="flex justify-between text-sm text-gray-500 mb-8">
          <span>Sample received</span>
          <span>Processing</span>
          <span>Analysis</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-8">
          Your test sample is being analyzed by our lab partners.
          <br />Results will be available in approximately 48 hours.
        </p>
        
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Clock className="h-4 w-4 text-blue-600" />
          <p className="text-sm text-blue-600">Last updated: 6 hours ago</p>
        </div>
      </div>
      
      <Button variant="outline" className="w-full">
        Check Status
      </Button>
    </motion.div>
  );
}

// Doctor Schedule Card Component
function DoctorScheduleCard() {
  const [showSchedule, setShowSchedule] = useState(false);
  
  const timeSlots = [
    { time: "9:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "1:00 PM", available: false },
    { time: "2:30 PM", available: true },
    { time: "4:00 PM", available: true }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-3xl p-6 shadow-xl relative overflow-hidden"
    >
      <div className="flex items-center mb-4">
        <Video className="text-blue-600 mr-3 h-6 w-6" />
        <h3 className="text-xl font-semibold">Doctor Consultation</h3>
      </div>
      
      {!showSchedule ? (
        <>
          <div className="flex justify-center my-6">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="bg-blue-50 p-4 rounded-2xl w-24 h-24 flex items-center justify-center"
            >
              <Video className="h-12 w-12 text-blue-600" />
            </motion.div>
          </div>
          
          <p className="text-center text-gray-600 text-sm mb-6">
            Connect with your healthcare provider via video call to discuss your health status and medication plan.
          </p>
          
          <Button className="w-full" onClick={() => setShowSchedule(true)}>
            Schedule a Call
          </Button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Available Times</h4>
            <button 
              onClick={() => setShowSchedule(false)}
              className="text-sm text-blue-600 hover:underline"
            >
              Back
            </button>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <button className="p-1">
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </button>
            <p className="font-medium">Wednesday, April 9</p>
            <button className="p-1">
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-2 mb-6">
            {timeSlots.map((slot, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: slot.available ? 1.02 : 1 }}
                className={`p-3 rounded-lg border ${
                  slot.available 
                    ? "border-blue-200 bg-blue-50 cursor-pointer" 
                    : "border-gray-200 bg-gray-100 opacity-60"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={slot.available ? "text-blue-800" : "text-gray-500"}>
                    {slot.time}
                  </span>
                  {!slot.available && (
                    <span className="text-xs text-gray-500">Unavailable</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <Button className="w-full" disabled>
            Confirm Appointment
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}