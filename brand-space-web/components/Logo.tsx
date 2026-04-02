'use client';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeMap = {
    sm: { width: 20, height: 20 },
    md: { width: 24, height: 24 },
    lg: { width: 32, height: 32 }
  };

  const textSizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const { width, height } = sizeMap[size];
  const textSize = textSizeMap[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo 图片 - 理想汽车品牌标识 */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 240 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* 左边 - 大弧形 */}
        <path
          d="M 24 43 L 80 43 Q 106 43 106 86 Q 106 129 80 129 L 24 129 Z"
          fill="black"
        />

        {/* 右上 - 平行四边形 */}
        <path
          d="M 111 43 L 167 43 L 145 86 L 89 86 Z"
          fill="black"
        />

        {/* 右下 - 平行四边形 */}
        <path
          d="M 111 100 L 167 100 L 145 143 L 89 143 Z"
          fill="black"
        />
      </svg>

      {/* 文字 */}
      {showText && (
        <span className={`font-bold text-gray-900 whitespace-nowrap ${textSize}`}>
          品牌空间
        </span>
      )}
    </div>
  );
}
