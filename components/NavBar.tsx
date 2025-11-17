
import Link from 'next/link';


const Navbar = () => {
  
  return (
    <header className='fixed top-4 left-0 right-0 z-50'>
        <nav className="flex flex-row items-center justify-between container mx-auto px-4 p-4">
            <p className="text-white text-2xl font-bold">Agro App</p>
            
            <div className='flex-center flex-row'>
                    <Link 
                      className="text-white rounded-full px-4 right-4 py-2 green-gradient font-medium" 
                      href="https://chat.whatsapp.com/JoIvJRuLMgq9iFU2whad6z?mode=wwt"
                    >
                      Unite a la comunidad
                    </Link>
            </div>
        </nav>
    </header>
  );
};

export default Navbar;