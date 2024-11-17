import React from 'react';

interface CardFinancialSummaryProps {
    title: string;
    icon: React.ReactNode;
    content: string;
    color: string;
}

const CardFinancialSummary: React.FC<CardFinancialSummaryProps> = ({ title, icon, content, color }) => (
    <div
        className={`min-w-48 flex flex-row gap-x-5 items-center text-center justify-center border ${color} p-5 rounded `}
    >
        <div className='w-2/3 text-left'>
            <h2 className='font-medium'>{title}</h2>
            <p className='text-lg font-bold'>R$ {content}</p>
        </div>

        <p className={`w-1/3 text-4xl ${color}`}>{icon}</p>
    </div>
);

export default CardFinancialSummary;
